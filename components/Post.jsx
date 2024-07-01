import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Post() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "http://cederdorff.com/race/images/placeholder-image.webp",
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Placeholder Bathroom</Text>
        <Text style={styles.rating}>Rating: ★★★★☆</Text>
        <Text style={styles.distance}>~300m</Text>
        <Text style={styles.description}>
          This is a short description of the placeholder bathroom.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightyellow",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
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
    color: "gray",
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
