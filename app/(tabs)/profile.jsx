import StyledButton from "@/components/StyledButton";
import {
  borderRadius,
  labelFontSize,
  placeholderTextColor,
  primary,
  secondary,
  tintColorLight,
} from "@/constants/ThemeVariables";
import { auth } from "@/firebase-config";
import * as ImagePicker from "expo-image-picker";
import { Stack, router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { backgroundYellow, black, pink } from "../../constants/ThemeVariables";

export default function Profile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  // url to fetch (get and put) user data from Firebase Realtime Database
  const url = `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser?.uid}.json`;

  useEffect(() => {
    setMail(auth.currentUser.email); // set mail to the current user email
    getUser(); // fetch user data from Firebase Realtime Database
  }, []);

  async function getUser() {
    const response = await fetch(url);
    const userData = await response.json();

    if (userData) {
      // if userData exists set states with values from userData (data from Firebase Realtime Database)
      setName(userData?.name); // set name to the value of the name property from userData
      setSurname(userData?.surname); // set name to the value of the name property from userData
      setImage(userData?.image); // set image to the value of the image property from userData
    }
  }

  // sign out the user and redirect to the sign-in screen
  async function handleSignOut() {
    await signOut(auth);
    router.replace("/sign-in");
  }

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Sign Out"
              color={Platform.OS === "ios" ? tintColorLight : primary}
              onPress={handleSignOut}
            />
          ),
        }}
      />
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://cederdorff.com/race/images/placeholder-image.webp",
            }}
          />
        </View>
        <Text style={styles.label}>
          {name} {surname}
        </Text>
        <View style={styles.buttonContainer}>
          <StyledButton
            text="Edit profile"
            style="primary"
            onPress={() => router.push("/edit-profile")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: backgroundYellow,
  },
  label: {
    fontSize: labelFontSize,
    color: black,
    marginTop: 30,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: tintColorLight,
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: 2,
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: pink,
    borderRadius: 200,
    padding: 0,
    backgroundColor: tintColorLight,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 200,
  },
  buttonContainer: {
    marginBottom: 50,
    marginTop: 20,
  },
});
