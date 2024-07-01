// TabLayout.jsx

import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/ThemeVariables";
import { StyleSheet } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "map") {
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
          backgroundColor: Colors.darkgray,
        },
        tabBarActiveTintColor: Colors.yellow,
        tabBarInactiveTintColor: Colors.background,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
