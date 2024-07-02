import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import Post from "@/components/Post";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

export default function ToiletDetails() {
  const { id } = useLocalSearchParams();
  const [toilet, setToilet] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    getToilet();
  }, []);

  async function getToilet() {
    const response = await fetch(
      `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets/${id}.json`
    );
    const data = await response.json();
    data.id = id;
    setToilet(data);
  }
  useEffect(() => {
    async function requestLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.04,
      });
    }
    requestLocationPermission();
  }, []);

  console.log(
    "latitude",
    toilet?.wgs84_lalo?.lat,
    "longitude",
    toilet?.wgs84_lalo?.lon
  );
  return (
    <ScrollView>
      <Stack.Screen options={{ title: toilet?.adrvoisfr || "" }} />
      <Image
        source={{ uri: toilet?.photo }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainter}>
        <Text style={styles.title}>{toilet?.adrvoisfr}</Text>
        <Text style={styles.mail}>{toilet?.mail}</Text>
        <Text style={styles.postsBy}>Posts by {toilet?.adrvoisfr}</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: toilet?.wgs84_lalo?.lat,
          longitude: toilet?.wgs84_lalo?.lon,
          latitudeDelta: 0.0922, // Adjust as needed for zoom level
          longitudeDelta: 0.0421, // Adjust as needed for zoom level
        }}
        region={{
          latitude: toilet?.wgs84_lalo?.lat,
          longitude: toilet?.wgs84_lalo?.lon,
          latitudeDelta: 0.0922, // Adjust as needed for zoom level
          longitudeDelta: 0.0421, // Adjust as needed for zoom level
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: toilet?.wgs84_lalo?.lat,
            longitude: toilet?.wgs84_lalo?.lon,
          }}
          image={{ uri: "../../../assets/images/toilet.png" }}
        ></Marker>
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  mail: {
    fontSize: 16,
    color: "gray",
  },
  textContainter: {
    padding: 16,
  },
  postsBy: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
  },
  map: {
    height: 400,
    width: "100%",
  },
});
