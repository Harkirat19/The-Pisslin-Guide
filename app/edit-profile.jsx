import StyledButton from "@/components/StyledButton";
import { auth } from "@/firebase-config";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, FontSizes } from "@/constants/ThemeVariables";

export default function EditProfileModal() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState(
    "https://cederdorff.com/race/images/placeholder-image.webp"
  );

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
    }
  }

  async function chooseImage(type) {
    let result;

    if (type === "camera") {
      await requestCameraPermission();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        quality: 0.3,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        quality: 0.3,
      });
    }

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }
  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
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
      <View style={styles.input}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Enter Your First Name"
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.input}>
        <Text style={styles.label}>Surname</Text>
        <TextInput
          onChangeText={setSurname}
          value={surname}
          placeholder="Enter your Last Name"
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton text="Save" onPress={handleSaveUser} />
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
    color: Colors.darkgray,
    fontSize: FontSizes.small,
  },

  input: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black,
  },

  imageContainer: {
    borderRadius: 200,
    padding: 0, // Add box shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 12, // Shadow opacity
    shadowRadius: 14, // Shadow radius
    marginBottom: 60,
  },

  image: {
    aspectRatio: 1,
    borderRadius: 200,
  },
  buttonContainer: {
    marginVertical: 40,
  },
});
