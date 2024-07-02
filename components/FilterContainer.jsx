import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/ThemeVariables";
import Tags from "@/components/Tags";

export default function FilterContainer() {
  const inactiveTags = ["Restaurant", "Free", "Highly Rated"]; // The tags for now.
  const activeTags = ["Toilet paper", "Piss"]; // Empty array where active tags go when user clicks it.

  return (
    <View style={styles.container}>
      <Tags activeTags={activeTags} inactiveTags={inactiveTags} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    padding: 15,
  },
});
