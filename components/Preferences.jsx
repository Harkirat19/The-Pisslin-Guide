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
    backgroundColor: Colors.background,
    paddingLeft: 15,
  },

  preferencecontainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.background,
    width: "100%",
    paddingTop: 15,
  },

  preference: {
    width: "22%",
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
