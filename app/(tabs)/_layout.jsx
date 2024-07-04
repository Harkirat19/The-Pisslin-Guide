// TabLayout.jsx
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Button } from "react-native";
import { Colors } from "@/constants/ThemeVariables";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "Map") {
            iconName = "map";
          } else if (route.name === "profile") {
            iconName = "user";
          }

          return (
            <TabBarIcon
              name={iconName}
              color={focused ? Colors.yellow : Colors.background}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: Colors.black,
        },
        tabBarActiveTintColor: Colors.yellow,
        tabBarInactiveTintColor: Colors.background,
      })}
    >
      <Tabs.Screen
        name="toilets"
        style={styles.bg}
        options={{
          title: "The  Pisslin'  Guide 🚽",
          tabBarLabel: "Home",
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: Colors.background,
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: 21.5,
          },
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("postToilet")}
            >
              <Text style={styles.buttonText}>Add Toilet</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: "Map",
          headerTitleStyle: {
            color: Colors.background,
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: 21.5,
          },
          headerStyle: {
            backgroundColor: Colors.black,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleStyle: {
            color: Colors.background,
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: 21.5,
          },
          headerStyle: {
            backgroundColor: Colors.black,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  bg: {
    backgroundColor: "black"
  },
});
