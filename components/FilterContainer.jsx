import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSizes } from "../constants/ThemeVariables";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function FilterContainer() {
  const inactiveTags = ["Restaurant", "Free", "Highly Rated"]; // The tags for now.
  const activeTags = ["Toilet paper"]; // Empty array where active tags go when user clicks it.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tags</Text>
      <View style={styles.tagsContainer}>
        {activeTags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <Icon size={15} name="close" type="material" color={Colors.text} />
          </View>
        ))}
        {inactiveTags.map((tag, index) => (
          <View key={index} style={styles.inactiveTag}>
            <Text style={styles.inactiveTagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.title}>Preferences</Text>
      {/* preferences here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    padding: 15,
  },

  title: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  tag: {
    backgroundColor: Colors.background,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    // Add box shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Required for Android to show shadow

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveTag: {
    backgroundColor: Colors.gray,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    // Add box shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Required for Android to show shadow
  },

  tagText: {
    color: Colors.text,
    fontSize: FontSizes.small,
    marginRight: 3,
  },

  inactiveTagText: {
    color: Colors.text,
    fontSize: FontSizes.small,
  },
});
