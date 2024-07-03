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
    <View style={styles.container}>
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
        showsUserLocation={true}
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
                title={toilet.typeeng}
                description={toilet.adrvoisfr}
              >
                <Image
                  source={toiletSign}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                  }}
                />
              </Marker>
            );
          } else {
            console.error("Invalid coordinates for toilet:", toilet);
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
  },
  map: {
    width: "100%",
    height: "100%",
  },
  filterCollapsed: {
    position: "absolute",
    top: 10,
    right: 70,
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
    borderRadius: 5,
    top: 62,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
});
