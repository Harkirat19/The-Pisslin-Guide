import StyledButton from "@/components/StyledButton";
import { auth } from "@/firebase-config";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/ThemeVariables";
import { Rating } from "react-native-ratings";

export default function AddReviewModal() {
  const { id } = useLocalSearchParams();
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState("");
  const userId = auth.currentUser?.uid;

  async function submitReview() {
    if (!reviewText.trim()) {
      alert("Please enter a review.");
      return;
    }

    try {
      const response = await fetch(
        `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets/${id}/reviews.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: reviewText,
            rating: rating,
            createdAt: new Date().toISOString(),
            user: userId,
          }),
        }
      );

      if (!response.ok) throw new Error("Something went wrong!");

      // Handle success (e.g., clear the review input, show a success message)
      alert("Review submitted successfully!");
      setReviewText("");
    } catch (error) {
      // Handle error (e.g., show an error message)
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={chooseImage} style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              "https://cederdorff.com/race/images/placeholder-image.webp",
          }}
        />
      </TouchableOpacity> */}
      <TextInput
        style={styles.input}
        onChangeText={setReviewText}
        value={reviewText}
        placeholder="Write a review..."
        multiline
      />
      <Rating
        showRating
        onFinishRating={(rating) => setRating(rating)}
        style={{ paddingVertical: 10 }}
        startingValue={rating}
        imageSize={30}
      />
      <StyledButton
        title="Submit Review"
        onPress={submitReview}
        style="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },
  label: {
    color: Colors.text,
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: Colors.pink,
    borderWidth: 4,
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: Colors.pink,
    borderRadius: 200,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 200,
  },
  buttonContainer: {
    marginBottom: 50,
    marginTop: 20,
  },
});
