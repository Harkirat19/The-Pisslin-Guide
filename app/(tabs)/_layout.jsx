// TabLayout.jsx
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Button } from "react-native-elements";
import { Colors } from "@/constants/ThemeVariables";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";

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
          backgroundColor: Colors.darkgray,
        },
        tabBarActiveTintColor: Colors.yellow,
        tabBarInactiveTintColor: Colors.background,
      })}
    >
      <Tabs.Screen
        name="toilets"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Button
              title="Add New"
              onPress={() => router.push("postToilet")}
              color="white"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
