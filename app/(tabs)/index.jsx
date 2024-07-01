import { StyleSheet, ScrollView, Text, View } from "react-native";
import Post from "../../components/Post";
import { Colors } from "@/constants/ThemeVariables";


export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>The Pisslin' Guide</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Post></Post>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
