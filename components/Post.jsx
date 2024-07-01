import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Post({ post }) {
  function formatDate(timestamp) {
    const createdAt = new Date(timestamp);
    return createdAt.toLocaleDateString();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Placeholder Bathroom</Text>

      <Image
        style={styles.image}
        source={"http://cederdorff.com/race/images/placeholder-image.webp"}
      />

      <View style={styles.footer}>
        <Text style={styles.city}>Louvain La Neuve</Text>
        <Text style={styles.country}>Belgium</Text>
        <Text style={styles.date}>22.2.222</Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
