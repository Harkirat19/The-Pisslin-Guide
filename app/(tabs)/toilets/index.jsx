import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import Post from "../../../components/Post";
import { Colors } from "@/constants/ThemeVariables";
import { useEffect, useState } from "react";

export default function Home() {
  const [toilets, setToilets] = useState([]);
  useEffect(() => {
    getToilets();
  }, []);

  async function getToilets() {
    const response = await fetch(
      "https://piin-88060-default-rtdb.europe-west1.firebasedatabase.app/toilets.json"
    );
    const data = await response.json();
    const toiletsArray = Object.keys(data).map((key) => {
      return {
        id: key,
        ...data[key],
      };
    });
    toiletsArray.sort((a, b) => b.createdAt - a.createdAt);
    setToilets(toiletsArray);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Pisslin' Guide</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={toilets}
        renderItem={({ item }) => <Post toilet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
