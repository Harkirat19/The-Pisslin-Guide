import { auth } from "@/firebase-config";
import { Stack, router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon component

import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors, FontSizes } from "../../constants/ThemeVariables";

export default function Profile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  // URL to fetch (get and put) user data from Firebase Realtime Database
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
      setSurname(userData?.surname); // set surname to the value of the surname property from userData
      setImage(userData?.image); // set image to the value of the image property from userData;
    }
  }

  // Sign out the user and redirect to the sign-in screen
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
              color={Colors.primary}
              onPress={handleSignOut}
            />
          ),
        }}
      />
      <View>
        {/* Edit button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/edit-profile")}
          >
            <Icon name="edit" size={50} color="white" />
          </TouchableOpacity>
        </View>

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
        <Text style={styles.labelsmall}>
          {mail}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },

  label: {
    color: Colors.text,
    marginTop: 30,
    marginBottom: 5,
    fontSize: FontSizes.large,
    fontWeight: "bold",
    textAlign: "center",
  },

  labelsmall: {
    color: Colors.text,
    marginTop: 10,
    marginBottom: 5,
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
  },

  imageContainer: {
    borderRadius: 200,
    padding: 0, // Add box shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },

  image: {
    aspectRatio: 1,
    borderRadius: 200,
  },

  button: {
    padding: 7,
    backgroundColor: Colors.gray,
    borderRadius: 8,
  },

  buttonContainer: {
    top: 270,
    left: 40,
    position: "absolute",
    zIndex: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Required for Android
  },
});
