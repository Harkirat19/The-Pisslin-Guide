import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, FontSizes } from "../constants/ThemeVariables";
import Tags from "@/components/Tags";
import Preferences from "@/components/Preferences";

export default function FilterContainer() {
  const inactiveTags = ["Restaurant", "Free", "Highly Rated"]; // The tags for now.
  const activeTags = ["Toilet paper"]; // Empty array where active tags go when user clicks it.

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>The Pisslin' Guide</Text> */}
      <Tags activeTags={activeTags} inactiveTags={inactiveTags} />
      <Preferences />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 0,
    width: "100%",

    zIndex: 5,
    shadowColor: Colors.text,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.large,
    fontWeight: "bold",
  },
});
