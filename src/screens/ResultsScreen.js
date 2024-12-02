import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ResultsScreen({ route, navigation }) {
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>
        You scored {score} out of {total}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Categories")}
      >
        <Text style={styles.buttonText}>Go to Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.retryButton]}
        onPress={() => navigation.navigate("Quiz", { categoryId: null })}
      >
        <Text style={styles.buttonText}>Retry Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007b5e",
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007b5e",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  retryButton: {
    backgroundColor: "#00573e",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
