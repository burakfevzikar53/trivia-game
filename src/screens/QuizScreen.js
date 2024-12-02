import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";

const QuizScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  const handleAnswerSelection = (selected, correct) => {
    setSelectedAnswer(selected);
    if (selected === correct) {
      setScore((prev) => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback("");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        navigation.navigate("Results", { score, total: questions.length });
      }
    }, 1000);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007b5e" />
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No questions found. Please try again.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === answer &&
              (answer === currentQuestion.correct_answer
                ? styles.correctAnswer
                : styles.wrongAnswer),
          ]}
          onPress={() => handleAnswerSelection(answer, currentQuestion.correct_answer)}
          disabled={!!selectedAnswer}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
      {feedback ? <Text style={styles.feedbackText}>{feedback}</Text> : null}
      <Text style={styles.scoreText}>Score: {score}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  answerButton: {
    backgroundColor: "#007b5e",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  answerText: {
    color: "#fff",
    textAlign: "center",
  },
  correctAnswer: {
    backgroundColor: "#28a745",
  },
  wrongAnswer: {
    backgroundColor: "#dc3545",
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  scoreText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizScreen;
