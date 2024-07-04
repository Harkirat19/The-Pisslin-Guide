import { StyleSheet, View, FlatList } from "react-native";
import Post from "../../../components/Post";
import { Colors } from "@/constants/ThemeVariables";
import { useEffect, useState } from "react";
import FilterContainer from "@/components/FilterContainer";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function Home() {
  const [toilets, setToilets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  useEffect(() => {
    getToilets();
  }, []);

  async function getToilets() {
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
    // Flatten the reviews from all toilets into a single array
    const allReviews = toiletsArray.reduce(
      (acc, toilet) => [...acc, ...toilet.reviews],
      []
    );
    setToilets(toiletsArray);
    setReviews(allReviews);
  }

  const FilterComponent = () => {
    return (
      <View style={styles.filterComponent}>
        <FilterContainer />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterCollapsed}
        onPress={() => setFilterVisible(!filterVisible)}
      >
        <Icon size={20} name="tune" type="material" color={Colors.text} />
      </TouchableOpacity>
      {filterVisible && <FilterComponent />}

      <FlatList
        data={toilets}
        renderItem={({ item }) => <Post key={item.id} toilet={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  filterCollapsed: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
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
    marginTop: 50,
    paddingBottom: 70, //fix stupid bottom margin
  },
});
