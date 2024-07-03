import { Stack } from "expo-router";
import { primary, tintColorLight } from "@/constants/ThemeVariables";
import { Colors } from "../../constants/ThemeVariables";
export default function AddReviewModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
        },
        tabBarStyle: {
          backgroundColor: Colors.background,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Add review",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
