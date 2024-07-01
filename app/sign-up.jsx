import { Stack, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import StyledButton from "../components/StyledButton";
import { auth } from "../firebase-config"; // Import the auth object from firebase
import { Colors } from "../constants/ThemeVariables";

export default function SignUp() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignUp() {
    // Create user with email and password
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // User Created and signed in
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
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create new account",
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <Text style={styles.label}>Mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMail}
        value={mail}
        placeholder="Type your mail"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Type your password"
      />
      <Text style={styles.errorMessage}>{message}</Text>
      <StyledButton
        text="Create Account"
        style="primary"
        onPress={handleSignUp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },
  main: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
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
    borderColor: Colors.text,
    borderWidth: 2,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
