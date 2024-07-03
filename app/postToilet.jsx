import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import StyledButton from "@/components/StyledButton";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { AirbnbRating } from "react-native-ratings";

export default function PostModal() {
  const [location, setLocation] = useState({});
  const [image, setImage] = useState("");
  const [toiletName, setToiletName] = useState("");
  const [toiletDesc, setToiletDesc] = useState("");
  const [rating, setRating] = useState(0);
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  // console.log("post id:", id);

  useEffect(() => {
    requestLocationPermissions();
    loadLocation();
    requestCameraPermissions();
  }, []);

  async function getPost() {
    const response = await fetch(
      `https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets/${id}.json`
    );
    const data = await response.json();
    setImage(data.image);
    setToiletName(data.toiletName);
    setToiletDesc(data.toiletDesc);
    setRating(data.rating || 0);
  }

  async function requestLocationPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
  }

  async function requestCameraPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access camera was denied");
      return;
    }
  }

  async function loadLocation() {
    await requestLocationPermissions();
    setLocation(await getLocation());
  }

  async function getLocation() {
    const currentLocation = await Location.getCurrentPositionAsync();
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${currentLocation.coords.latitude}+${currentLocation.coords.longitude}&key=12907176665749a9b8a55a4e09ccaa73`
    );
    const data = await response.json();
    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      street: data.results[0].components.road,
      city:
        data.results[0].components.city ||
        data.results[0].components.postal_city ||
        data.results[0].components.town,
      country: data.results[0].components.country,
    };
  }

  async function chooseImage(type) {
    let result;

    if (type === "camera") {
      await requestCameraPermissions();
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

  function chooseCameraOrLibrary() {
    showActionSheetWithOptions(
      {
        options: ["Take a photo", "Choose from library", "Cancel"],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          chooseImage("camera");
        } else if (buttonIndex === 1) {
          chooseImage("library");
        }
      }
    );
  }

  async function handleCreatePost() {
    const createdAt = new Date().getTime();
    const post = {
      adrvoisfr: `${location.street}, ${location.city}, ${location.country}`,
      adrvoisnl: `${location.street}, ${location.city}, ${location.country}`,
      gestion: "Privé",
      gratuite: "Gratuit / Gratis",
      heureouv: "10:00 - 23:00",
      image: image,
      niveau: "0",
      nrpol: "5",
      pmr: "Nee / Non",
      rue: location.street,
      specloc: toiletName,
      typedut: "TOILET",
      typeeng: "TOILET",
      typefr: "TOILETTE",
      typtoil: "Gastvrije toiletten / Toilettes accueillantes",
      wgs84_lalo: `${location.latitude}, ${location.longitude}`,
      wgs84_lat: location.latitude.toString(),
      wgs84_long: location.longitude.toString(),
      z_pcdd_fr: "Pentagone",
      z_pcdd_nl: "Vijfhoek",
      uid: "SeoDnC3eyAbOldb0Mw0ZDnVgm1P2",
    };

    // console.log(post);
    const response = await fetch(
      "https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets.json",
      {
        method: "POST",
        body: JSON.stringify(post),
      }
    );

    if (response.ok) {
      router.back();
    }
  }

  function handleSave() {
    handleCreatePost();
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color="white"
            />
          ),
          headerRight: () => (
            <Button title="Create" onPress={handleCreatePost} color="white" />
          ),
        }}
      />
      <View style={styles.viewStyle}>
        <Text style={styles.title}>Upload Toilet Image</Text>
        <TouchableOpacity onPress={chooseCameraOrLibrary}>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://cederdorff.com/race/images/placeholder-image.webp",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewStyle}>
        <Text style={styles.title}>Toilet Name</Text>
        <View style={styles.placeholder}>
          <TextInput
            onChangeText={setToiletName}
            value={toiletName}
            placeholder="Type the name for the toilet"
            placeholderTextColor="#7F8C8D"
          />
        </View>
      </View>
      <View style={styles.viewStyle}>
        <Text style={styles.title}>Toilet Description</Text>
        <View style={styles.placeholder}>
          <TextInput
            onChangeText={setToiletDesc}
            value={toiletDesc}
            placeholder="Type the description for the toilet"
            placeholderTextColor="#7F8C8D"
          />
        </View>
      </View>
      {/* <View style={styles.viewStyle}>
        <Text style={styles.title}>Ratings</Text>
        <AirbnbRating
          count={5}
          reviews={["Terrible😫", "Bad😑", "Okay🥲", "Good😊", "Great😍"]}
          defaultRating={rating}
          size={30}
          onFinishRating={(rating) => setRating(rating)}
        />
      </View> */}
      <View style={styles.viewStyle}>
        <Text style={styles.title}>Current Location</Text>
        <View style={styles.placeholder}>
          <TextInput
            placeholder="Location for the Toilet"
            placeholderTextColor="#7F8C8D"
            value={
              location.street && location.city
                ? `${location.street}, ${location.city}, ${location.country}`
                : "Loading your current location ... "
            }
            editable={false}
          />
        </View>
      </View>
      <View style={styles.createPost}>
        <StyledButton
          title={id ? "Update Post" : "Create Post"}
          onPress={handleSave}
          color="black"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "white",
  },
  createPost: {
    backgroundColor: "white",
    margin: 20,
  },
  container: {
    // flex: 1,
    margin: 2,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  title: {
    margin: 10,
    fontSize: 23,
    fontWeight: "bold",
    color: "black",
  },
  toiletName: {
    marginTop: 0,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    color: "black",
  },
  image: {
    marginLeft: 20,
    marginBottom: 20,
    width: 350,
    height: 300,
    backgroundColor: "white",
    marginTop: 0,
    borderStyle: "solid",
    borderColor: "#f9cc31",
    borderWidth: 5,
  },
  location: {
    marginTop: 0,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    color: "black",
  },
  placeholder: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#f9cc31",
    borderWidth: 5,
    borderRadius: 15,
    padding: 15,
    marginRight: 5,
    marginLeft: 5,
  },
});
