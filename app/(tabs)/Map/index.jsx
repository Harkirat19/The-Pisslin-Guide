import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "@/constants/ThemeVariables";
import FilterContainer from "../../../components/FilterContainer";
import toiletSign from "@/assets/images/toiletSign.png";
import locationIcon from "@/assets/images/locationIcon.png";

export default function MapTab() {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(null);
  const [toilets, setToilets] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    getToilets();
  }, []);

  async function getToilets() {
    try {
      const response = await fetch(
        "https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets.json"
      );
      const data = await response.json();
      const arrayOfToilets = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        };
      });
      setToilets(arrayOfToilets);
    } catch (error) {
      console.error("Error fetching toilets: ", error);
    }
  }

  useEffect(() => {
    async function requestLocationPermissions() {
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

      Location.watchHeadingAsync((newHeading) => {
        setHeading(newHeading.trueHeading);
      });
    }
    requestLocationPermissions();
  }, []);

  const FilterComponent = () => {
    return (
      <View style={styles.filterComponent}>
        <FilterContainer />
      </View>
    );
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.filterCollapsed}
        onPress={() => setFilterVisible(!filterVisible)}
      >
        <Icon size={20} name="tune" type="material" color={Colors.text} />
      </TouchableOpacity>
      {filterVisible && <FilterComponent />}

      <MapView
        style={styles.map}
        initialRegion={location}
        showsUserLocation={false}
        followsUserLocation={true}
      >
        {location && (
          <>
            <Circle
              center={location}
              radius={50}
              strokeColor="rgba(0, 112, 255, 0.5)"
              fillColor="rgba(0, 112, 255, 0.2)"
            />
            {heading !== null && (
              <Marker
                coordinate={location}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={heading}
                title="You are here!"
              >
                <Image
                  source={locationIcon}
                  style={{
                    width: 40,
                    height: 40,
                    transform: [{ rotate: `${heading}deg` }],
                  }}
                />
              </Marker>
            )}
          </>
        )}
        {toilets.map((toilet) => {
          const latitude = parseFloat(toilet.wgs84_lat);
          const longitude = parseFloat(toilet.wgs84_long);
          if (!isNaN(latitude) && !isNaN(longitude)) {
            return (
              <Marker
                key={toilet.id}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                // title={toilet.specloc}
                // description={toilet.adrvoisfr}
                // source={{ uri: toilet.image }}
              >
                <Image
                  source={toiletSign}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                  }}
                />
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{toilet.specloc}</Text>
                    <Text style={styles.calloutText}>{toilet.adrvoisfr}</Text>
                    <Image
                      source={{ uri: toilet.image }}
                      style={styles.calloutImage}
                    />
                  </View>
                </Callout>
              </Marker>
            );
          } else {
            //console.error("Invalid coordinates for toilet:", toilet);
            return null;
          }
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  calloutContainer: {
    backgroundColor: "#f9cc31",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 0.5,
    padding: 10,
    width: 150,
    height: "auto",
  },
  calloutTitle: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutText: {
    color: "#333",
    fontSize: 12,
    marginBottom: 5,
  },
  calloutImage: {
    width: "100%",
    height: 70,
    borderRadius: 6,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  filterCollapsed: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },

  filterComponent: {
    position: "absolute",
    top: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
    pointerEvents: "auto",
  },
});
