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
import { ScrollView } from "react-native";

export default function AddReviewModal() {
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState("");
  const userId = auth.currentUser?.uid;
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState(null);

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
            image: image,
            createdAt: new Date().toISOString(),
            user: userId,
          }),
        }
      );

      if (!response.ok) throw new Error("Something went wrong!");

      // Handle success (e.g., clear the review input, show a success message)
      alert("Review submitted successfully!");
      setReviewText("");
      if (response.ok) {
        router.back();
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      alert(error.message);
    }
  }

  async function chooseImage(type) {
    let result;

    if (type === "camera") {
      await requestCameraPermission();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        quality: 0.3,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        quality: 0.3,
      });
    }

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Text style={styles.headline}>Write Review</Text>
      <TextInput
        style={styles.input}
        onChangeText={setReviewText}
        value={reviewText}
        placeholder="Write a review..."
        multiline
      />
      <Rating
        onFinishRating={(rating) => setRating(rating)}
        style={{
          backgroundColor: "white",
          padding: 10,
          fill: "black",
          borderRadius: 10,
          borderColor: Colors.pink,
          borderWidth: 4,
          marginTop: 20,
        }}
        startingValue={rating}
        imageSize={30}
        showRating
        ratingTextColor={"black"}
        tintColor={"black"}
      />
      <TouchableOpacity onPress={chooseImage} style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              "https://cederdorff.com/race/images/placeholder-image.webp",
          }}
        />
      </TouchableOpacity>
      <StyledButton
        text="Submit Review"
        onPress={submitReview}
        style="primary"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  label: {
    color: Colors.text,
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    height: 150,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: Colors.pink,
    borderWidth: 4,
  },
  imageContainer: {
    borderColor: "none",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    aspectRatio: 1,
    height: 200,
    resizeMode: "cover",
  },
  buttonContainer: {
    marginBottom: 50,
    marginTop: 20,
  },
});
