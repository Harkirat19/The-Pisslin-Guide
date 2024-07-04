import { StyleSheet, View, FlatList } from "react-native";
import Post from "../../../components/Post";
import { Colors, FontSizes } from "@/constants/ThemeVariables";
import { useEffect, useState } from "react";
import FilterContainer from "@/components/FilterContainer";
import { TouchableOpacity, Text, RefreshControl } from "react-native";
import { Icon } from "react-native-elements";
import { calcDist, getCurrentLocation } from "@/utils/distanceMathsValue";

export default function Home() {
  const [toilets, setToilets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const location = await getCurrentLocation();
        setUserLocation(location);
        await getToilets(location);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function getToilets(userLocation) {
    const response = await fetch(
      "https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets.json"
    );
    const data = await response.json();
    const toiletsArray = await Promise.all(
      Object.keys(data).map(async (key) => {
        const toilet = {
          id: key,
          ...data[key],
        };
        // Fetch reviews for each toilet
        const reviewsResponse = await fetch(
          `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets/${key}/reviews.json`
        );
        const reviewsData = await reviewsResponse.json();
        const reviewsArray = reviewsData
          ? Object.keys(reviewsData).map((reviewKey) => ({
              ...reviewsData[reviewKey],
              id: reviewKey,
              toiletId: key, // Associate each review with its toilet
            }))
          : [];
        return {
          ...toilet,
          reviews: reviewsArray,
        };
      })
    );
    const toiletsWithDistance = toiletsArray.map((toilet) => ({
      ...toilet,
      distance: calcDist(
        userLocation?.latitude,
        userLocation?.longitude,
        toilet?.wgs84_lat,
        toilet?.wgs84_long
      ),
    }));

    toiletsWithDistance.sort((a, b) => a.distance - b.distance);

    // Flatten the reviews from all toilets into a single array
    const allReviews = toiletsWithDistance.reduce(
      (acc, toilet) => [...acc, ...toilet.reviews],
      []
    );

    setToilets(toiletsWithDistance);
    setReviews(allReviews);
  }

  const FilterComponent = () => {
    return (
      <View style={styles.filterComponent}>
        <FilterContainer />
      </View>
    );
  };

  async function handleRefresh() {
    setToilets([]);
    setRefreshing(true);
    await getToilets(userLocation);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }
  if (!toilets) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterCollapsed}
        onPress={() => setFilterVisible(!filterVisible)}
      >
        <Icon size={20} name="tune" type="material" color={Colors.text} />
      </TouchableOpacity>
      {filterVisible && <FilterComponent />}
      <Text style={styles.title}>Toilets Near You:</Text>
      <FlatList
        data={toilets}
        renderItem={({ item }) => <Post key={item.id} toilet={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="white"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.background,
  },

  filterCollapsed: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    width: 40,
    backgroundColor: Colors.background,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },

  filterComponent: {
    position: "absolute",
    top: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
    pointerEvents: "auto",
  },

  listContent: {
    paddingBottom: 70, //fix stupid bottom margin
  },

  title: {
    margin: 10,
    fontSize: FontSizes.large,
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "center",
    marginTop: 20,
  },
});
