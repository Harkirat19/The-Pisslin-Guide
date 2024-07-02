import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors, FontSizes } from "../constants/ThemeVariables";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { useState } from "react";

export default function FilterContainer() {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
     const [value, setValue] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>
      <View
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
              backgroundColor: Colors.background,
            }}
          />
        </View>

        <View style={styles.preference}>
          <Text style={styles.smalltitle}>Distance</Text>
          <Slider
            thumbStyle={{
              height: 16,
              width: 16,
              backgroundColor: Colors.background,
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
      </View>
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
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.gray,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 10,
  },

  preference: {
    width: "20%",
  },

  title: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
  },

  smalltitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },

  distancetext: {
    fontSize: FontSizes.small,
    color: Colors.darkgray,
    textAlign: "center",
    marginTop: -10,
  }
});
