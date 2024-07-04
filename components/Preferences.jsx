import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors, FontSizes } from "../constants/ThemeVariables";
import { Slider } from "react-native-elements";
import { CheckBox } from "react-native-elements";

export default function FilterContainer() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [value, setValue] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>
      <ScrollView
        style={styles.preferencecontainer}
        horizontal
        showsHorizontalScrollIndicator={true}
      >
        <View style={styles.preference}>
          <Text style={styles.smalltitle}>Cleanliness</Text>
          <Slider
            thumbStyle={{
              height: 16,
              width: 16,
              backgroundColor: Colors.black,
            }}
          />
        </View>

        <View style={styles.preference}>
          <Text style={styles.smalltitle}>Distance</Text>
          <Slider
            thumbStyle={{
              height: 16,
              width: 16,
              backgroundColor: Colors.black,
            }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={value}
            onValueChange={setValue}
          />
          <Text style={styles.distancetext}>{value} km</Text>
        </View>

        <View style={styles.preference}>
          <Text style={styles.smalltitle}>Free</Text>
          <CheckBox left checked={check1} onPress={() => setCheck1(!check1)} />
        </View>
        <View style={styles.preference}>
          <Text style={styles.smalltitle}>Urinals</Text>
          <CheckBox left checked={check2} onPress={() => setCheck2(!check2)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingLeft: 15,
  },

  preferencecontainer: {
    flexDirection: "row",
    flexWrap: "nowrap", // Ensure the items do not wrap and stay in a single line for horizontal scroll
    backgroundColor: Colors.gray,
    width: "100%",
    paddingTop: 15,
  },

  preference: {
    marginRight: 15, // Add some spacing between the items
    width: 80, // Set a fixed width that works well for your design
  },

  title: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
  },

  smalltitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },

  distancetext: {
    fontSize: FontSizes.small,
    color: Colors.black,
    textAlign: "center",
    marginTop: -10,
  },
});
