import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/ThemeVariables";
import { router } from "expo-router";
import { averageRating } from "../utils/averageRating";

export default function Post({ toilet }) {
  // console.log("reviews", reviews);
  return (
    <TouchableOpacity
      onPress={() => router.push(`/toilets/${toilet.id}`)}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{
          uri: toilet?.image
            ? toilet?.image
            : "http://cederdorff.com/race/images/placeholder-image.webp",
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{toilet?.adrvoisfr}</Text>
        <Text style={styles.rating}>{averageRating(toilet?.reviews)} ★</Text>
        <Text style={styles.distance}>~300m</Text>
        <Text style={styles.distance}>{toilet?.heureouv}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.yellow,
    padding: 10,
    marginTop: 25,
    margin: 10,
    borderRadius: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "95%",
    flexDirection: "row", // Align items in a row
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  content: {
    flex: 1, // Take up remaining space
    justifyContent: "center", // Center vertically
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
  },
  distance: {
    fontSize: 12,
    marginBottom: 5,
    color: Colors.red,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  city: {
    fontSize: 14,
  },
  country: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
  },
});
