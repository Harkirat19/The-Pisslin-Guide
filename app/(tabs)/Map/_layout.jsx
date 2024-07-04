import { Stack } from "expo-router";
import { Colors } from "../../../constants/ThemeVariables";

export default function MapLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: "#f9cc31",
          marginLeft: 0,
          fontWeight: "bold",
          fontSize: 21.5,
        },
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: "#f9cc31",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />{" "}
    </Stack>
  );
}
