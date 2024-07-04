import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase-config";
export default function TabsIndex() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/toilets");
      } else {
        router.replace("/sign-in");
      }
    });
  }, []);
  return null;
}
