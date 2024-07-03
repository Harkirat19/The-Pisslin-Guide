import { Text, View, Image, StyleSheet } from "react-native";
export default function Review({ review }) {
  return (
    <View key={review.id} style={styles.reviewContainer}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: review?.userImage
              ? review?.userImage
              : "https://cederdorff.com/race/images/placeholder-image.webp",
          }}
          style={{ width: 40, height: 40, borderRadius: 25 }}
        />
        <Text>
          {review.userName} {review.surName}
        </Text>
      </View>
      <View>
        <Text>Rating</Text>
        <Text style={styles.date}>
          {new Date(review.createdAt).toDateString()}
        </Text>
      </View>
      <Text>{review.text}</Text>
      <View style={styles.seperator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  seperator: {
    width: "100%",
    borderBottomColor: "gray",
    opacity: 0.3,
    borderBottomWidth: 1,
  },
  date: {
    marginTop: 5,
    color: "#3f3f3f",
    marginBottom: 5,
    fontSize: 10,
  },
});
