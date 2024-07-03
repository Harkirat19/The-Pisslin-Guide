import { StyleSheet, View, FlatList } from "react-native";
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

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterContainer />
      </View>
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

  filterContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1, // Ensure the filter stays on top
    backgroundColor: Colors.background, // Match the background color
  },
  listContent: {
    paddingTop: 220, // Adjust this value based on the height of your FilterContainer
  },
});
