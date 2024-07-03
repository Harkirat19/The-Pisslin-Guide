import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors, FontSizes } from "../constants/ThemeVariables";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function Tags({ activeTags, inactiveTags }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tags</Text>
      <ScrollView
        style={styles.tagsContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingLeft: 15,
    paddingTop: 10,
  },

  title: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "scroll",
    marginBottom: 20,
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
