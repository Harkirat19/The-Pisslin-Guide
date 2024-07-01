import * as Location from "expo-location";
import MapView, { Marker, Circle } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Callout } from "react-native-maps";
import { Text, Image } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/ThemeVariables";

export default function MapTab() {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function requestLocationPersmissions() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.04,
      });
    }
    requestLocationPersmissions();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={location} region={location}>
        <Marker
          coordinate={location}
          title="You are Here!!!"
          pinColor={Colors.background}
        ></Marker>
        <Circle
          center={location}
          radius={50}
          strokeColor="rgba(0, 112, 255, 0.5)" // Blue color
          fillColor="rgba(0, 112, 255, 0.2)" // Translucent blue
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
