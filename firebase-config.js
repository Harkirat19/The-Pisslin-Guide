import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSJuHppieMhW206k_saiCCGhpl-MesSZE",
  authDomain: "piin-88060.firebaseapp.com",
  projectId: "piin-88060",
  storageBucket: "piin-88060.appspot.com",
  messagingSenderId: "1026332882940",
  appId: "1:1026332882940:web:188af2a21d0be00b8ee479",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
