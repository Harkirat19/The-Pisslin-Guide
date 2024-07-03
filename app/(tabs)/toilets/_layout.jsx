import { Stack } from "expo-router";
import { primary, tintColorLight } from "@/constants/ThemeVariables";
export default function ToiletsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: primary,
        },
        headerTintColor: tintColorLight,
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
        },
        tabBarStyle: {
          backgroundColor: primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "The Pisslin' Guide", headerTitleAlign: "center", headerShown: "false" }}
      />
    </Stack>
  );
}
