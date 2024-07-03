import {
  Stack,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { Colors } from "@/constants/ThemeVariables";
import { auth } from "@/firebase-config";
import { Rating } from "react-native-ratings";
import Review from "../../../components/Review";
import StyledButton from "../../../components/StyledButton";
export default function ToiletDetails() {
  const { id } = useLocalSearchParams();
  const [toilet, setToilet] = useState({});
  const [location, setLocation] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getToilet();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getReviews();
    }, [])
  );
  async function getToilet() {
    const response = await fetch(
      `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets/${id}.json`
    );
    const data = await response.json();
    data.id = id;
    setToilet(data);
  }
  console.log(toilet);
  async function getReviews() {
    const response = await fetch(
      `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets/${id}/reviews.json`
    );
    const data = await response.json();
    const reviewsArray = await Promise.all(
      Object.keys(data).map(async (key) => {
        const review = data[key];
        // Fetch user details for each review
        const userResponse = await fetch(
          `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/users/${review.user}.json`
        );
        const userData = await userResponse.json();
        // Add user details to the review object
        return {
          id: key,
          ...review,
          userName: userData?.name, // Assuming the user's name is stored under 'name'
          surName: userData?.surname, // Assuming the user's name is stored under 'name'
          userImage: userData?.image, // Assuming the user's image URL is stored under 'image'
        };
      })
    );
    reviewsArray.sort((a, b) => b.createdAt - a.createdAt);
    setReviews(reviewsArray);
  }

  useEffect(() => {
    async function requestLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.04,
      });
    }
    requestLocationPermission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: toilet?.adrvoisfr || "" }} />
      <Image
        source={{
          uri: toilet?.image
            ? toilet?.image
            : "http://cederdorff.com/race/images/placeholder-image.webp",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainter}>
        <Text style={styles.title}>{toilet?.adrvoisfr}</Text>
        <Text>{toilet?.typtoil}</Text>
        <Text style={styles.rating}>Rating: ★★★★☆</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.iconsText}>
            <Image
              source={require("../../../assets/images/clock.png")}
              style={styles.icon}
            />
            <Text style={styles.time}>{toilet?.heureouv}</Text>
          </View>
          <View style={styles.iconsText}>
            <Image
              source={require("../../../assets/images/save-money.png")}
              style={styles.icon}
            />
            <Text style={styles.time}>{toilet?.gratuite}</Text>
          </View>
        </View>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: toilet?.wgs84_lalo?.lat,
          longitude: toilet?.wgs84_lalo?.lon,
          latitudeDelta: 0.0922, // Adjust as needed for zoom level
          longitudeDelta: 0.0421, // Adjust as needed for zoom level
        }}
        region={{
          latitude: toilet?.wgs84_lalo?.lat,
          longitude: toilet?.wgs84_lalo?.lon,
          latitudeDelta: 0.0922, // Adjust as needed for zoom level
          longitudeDelta: 0.0421, // Adjust as needed for zoom level
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: toilet?.wgs84_lalo?.lat,
            longitude: toilet?.wgs84_lalo?.lon,
          }}
        ></Marker>
      </MapView>

      <View style={styles.buttonContainer}>
        <Text style={styles.postsBy}>Reviews</Text>
        <StyledButton
          text="Add review"
          style="primary"
          onPress={() => router.push("/add-review")}
        />
      </View>
      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center", // Add this line to center the image horizontally
    height: 200,
    width: "95%",
    marginTop: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  mail: {
    fontSize: 16,
    color: "gray",
  },
  textContainter: {
    padding: 16,
  },
  postsBy: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
    padding: 10,
  },
  map: {
    height: 300,
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 8,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconsText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  reviewContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  seperator: {
    width: "100%",
    borderBottomColor: "gray",
    opacity: 0.3,
    borderBottomWidth: 1,
  },
  date: {
    marginTop: 5,
    color: "#3f3f3f",
    marginBottom: 5,
    fontSize: 10,
  },
});
