import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSizes } from "../constants/ThemeVariables";

export default function FilterContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tags</Text>
      {/* tags here */}
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
  }
});