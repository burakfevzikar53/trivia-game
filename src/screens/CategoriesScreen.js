import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 21, name: "Sports" },
  { id: 23, name: "History" },
  { id: 17, name: "Science & Nature" },
];

export default function CategoriesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryButton}
          onPress={() =>
            navigation.navigate("Quiz", { categoryId: category.id })
          }
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
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
  },
  categoryButton: {
    backgroundColor: "#007b5e",
    padding: 15,
    marginVertical: 10,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  categoryText: {
    color: "#fff",
    fontSize: 18,
  },
});
