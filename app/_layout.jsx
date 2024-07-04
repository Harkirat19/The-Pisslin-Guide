import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { useColorScheme } from "@/components/useColorScheme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase-config";
import Colors from "@/constants/ThemeVariables";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/toilets");
      } else {
        router.replace("/sign-in");
      }
    });
  }, []);

  return (
    <ActionSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="edit-profile"
            options={{
              title: "Edit Profile",
              presentation: "modal",
              headerTitleStyle: {
                color: "#f9cc31",
                marginLeft: 0,
                fontWeight: "bold",
                fontSize: 21.5,
              },
              headerStyle: {
                backgroundColor: "#000000",
              },
            }}
          />
          <Stack.Screen
            name="add-review"
            options={{
              title: "Add Review",
              presentation: "modal",

              headerTitleStyle: {
                color: "#f9cc31",
                marginLeft: 0,
                fontWeight: "bold",
                fontSize: 21.5,
              },
              headerStyle: {
                backgroundColor: "#000000",
              },
            }}
          />
          {/* <Stack.Screen
            name="toilets/[id]"
            options={{
              title: "Toilet Details",
              presentation: "modal",

              headerTitleStyle: {
                color: "#f9cc31",
                marginLeft: 0,
                fontWeight: "bold",
                fontSize: 21.5,
              },
              headerStyle: {
                backgroundColor: Colors.black,
              },
            }}
          ></Stack.Screen> */}
        </Stack>
      </ThemeProvider>
    </ActionSheetProvider>
  );
}
