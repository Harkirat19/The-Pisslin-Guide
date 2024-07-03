import { Text, View, Image, StyleSheet } from "react-native";
export default function Review({ review }) {
  return (
    <View style={styles.reviewContainer}>
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
      <View style={styles.flexBox}>
        {review?.rating && <Text>{review?.rating}/5 ★</Text>}
        <Text style={styles.date}>
          {new Date(review.createdAt).toDateString()}
        </Text>
      </View>
      <Text>{review.text}</Text>
      {review?.image && (
        <Image
          source={{
            uri: review?.image,
          }}
          style={{ width: "100%", maxHeight: 200, height: 200, marginTop: 10 }}
        />
      )}
      <Image
        style={styles.image}
        source={{
          uri: review?.image
            ? review?.image
            : "http://cederdorff.com/race/images/placeholder-image.webp",
        }}
      />
      <View style={styles.seperator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 0,
    width: "90%",
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
    marginTop: 15,
    marginBottom: 15,
  },
  date: {
    marginTop: 5,
    color: "#3f3f3f",
    marginBottom: 5,
    fontSize: 10,
  },
  flexBox: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
});
