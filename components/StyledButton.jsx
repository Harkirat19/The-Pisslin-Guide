import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  borderRadius,
  borderWidth,
  primary,
  secondary,
  tintColorDark,
} from "../constants/ThemeVariables";
import { Colors } from "../constants/ThemeVariables";

export default function StyledButton({ text, onPress, style }) {
  return (
    <TouchableOpacity
      style={
        style === "primary" ? styles.primaryButton : styles.secondaryButton
      }
      onPress={onPress}
    >
      <Text
        style={
          style === "primary"
            ? styles.primaryButtonText
            : styles.secondaryButtonText
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.yellow,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 4,
  },
  primaryButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: Colors.yellow,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 4,
  },
  secondaryButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
