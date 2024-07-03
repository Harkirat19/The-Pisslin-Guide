import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import Post from "../../../components/Post";
import { Colors } from "@/constants/ThemeVariables";
import { useEffect, useState } from "react";
import FilterContainer from "@/components/FilterContainer";

export default function Home() {
  const [toilets, setToilets] = useState([]);
  const [reviews, setReviews] = useState([]);
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
  console.log("all reve", reviews);

  return (
    <View style={styles.container}>
      <FilterContainer></FilterContainer>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={toilets}
        renderItem={({ item }) => <Post key={item.id} toilet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
