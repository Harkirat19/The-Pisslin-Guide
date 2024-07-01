import StyledButton from "@/components/StyledButton";
import { auth } from "@/firebase-config";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/ThemeVariables";
export default function EditProfileModal() {
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
      setSurname(userData?.surname); // set title to the value of the title property from userData
      setImage(userData?.image); // set image to the value of the image property from userData
    }
  }

  // sign out the user and redirect to the sign-in screen
  async function handleSignOut() {
    await signOut(auth);
    router.replace("/sign-in");
  }
  // choose an image from the device gallery
  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.3,
    });

    // if the user didn't cancel the image picker, set the image state with the base64 image
    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  async function handleSaveUser() {
    const userToUpdate = { name: name, mail: mail, surname, image }; // create an object to hold the user to update properties

    // send a PUT request to update user data in Firebase Realtime Database
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(userToUpdate),
    });
    // if the response is ok, log the user data
    if (response.ok) {
      const data = await response.json();
      router.replace("/profile");
      console.log("User data: ", data);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={chooseImage} style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              "https://cederdorff.com/race/images/placeholder-image.webp",
          }}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Type your name"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Surname</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSurname}
        value={surname}
        placeholder="Type your name"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <StyledButton text="Save" style="primary" onPress={handleSaveUser} />
      </View>
    </View>
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
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: Colors.pink,
    borderWidth: 4,
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: Colors.pink,
    borderRadius: 200,
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
