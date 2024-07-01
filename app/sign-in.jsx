import {
  borderRadius,
  labelFontSize,
  primary,
  secondary,
  tintColorLight,
} from "@/constants/ThemeVariables";
import { Stack, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import StyledButton from "../components/StyledButton";
import {
  backgroundYellow,
  black,
  pink,
  placeholderTextColor,
} from "../constants/ThemeVariables";
import { auth } from "../firebase-config"; // Import the auth object from firebase

export default function SignIn() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignIn() {
    // Sign in with email and password
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // User is signed in
        const user = userCredential.user; // User
        console.log("Signed in as", user.email);
        router.replace("/"); // Redirect to home
      })
      .catch((error) => {
        // Handle errors
        let errorMessage = error.code.split("/")[1];
        errorMessage = errorMessage.replaceAll("-", " ");
        setMessage(errorMessage);
      });
  }

  function goToSignUp() {
    router.push("/sign-up"); // Redirect to sign up
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign In",
          headerTintColor: tintColorLight,
          headerStyle: {
            backgroundColor: primary,
          },
        }}
      />
      <Text style={styles.label}>Mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMail}
        value={mail}
        placeholder="Type your mail"
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Type your password"
        placeholderTextColor={placeholderTextColor}
      />
      <Text style={styles.errorMessage}>{message}</Text>
      <StyledButton text="Sign In" onPress={handleSignIn} style="primary" />
      <StyledButton
        text="Create New Account"
        onPress={goToSignUp}
        style="secondary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: backgroundYellow,
  },
  main: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
  },
  label: {
    fontSize: labelFontSize,
    color: black,
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: tintColorLight,
    borderColor: black,
    borderWidth: 2,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
