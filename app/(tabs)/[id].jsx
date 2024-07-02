import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import Post from "@/components/Post";

export default function ToiletDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const response = await fetch(
      `https://post-app-4454d-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
    );
    const data = await response.json();
    data.id = id;
    setPost(data);
  }
  console.log(id);

  return (
    <ScrollView>
      <Stack.Screen options={{ title: post?.caption || "" }} />
      <Post post={post} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  mail: {
    fontSize: 16,
    color: "gray",
  },
  textContainter: {
    padding: 16,
  },
  postsBy: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
  },
});
