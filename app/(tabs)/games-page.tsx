import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const questions = [
  {
    question: "Combien de temps met un sac plastique pour se décomposer ?",
    options: ["1 an", "10 ans", "100 ans", "500 ans"],
    correctAnswer: "500 ans",
  },
  {
    question: "Quel est l'impact des déchets plastiques sur les océans ?",
    options: [
      "Aucun impact",
      "Pollution de l'eau",
      "Danger pour la faune marine",
      "Les deux",
    ],
    correctAnswer: "Les deux",
  },
  {
    question: "Que peut-on faire pour réduire les déchets plastiques ?",
    options: [
      "Utiliser des sacs réutilisables",
      "Recycler",
      "Réduire l'utilisation de plastique",
      "Toutes les réponses",
    ],
    correctAnswer: "Toutes les réponses",
  },
];

export default function GamePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {showScore ? (
          <Text style={styles.scoreText}>
            Vous avez répondu correctement à {score} sur {questions.length} questions !
          </Text>
        ) : (
          <>
            <Text style={styles.questionText}>
              {questions[currentQuestion].question}
            </Text>
            {questions[currentQuestion].options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'outfit-Bold',
    fontSize: 22,
    color: '#004aad',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#004aad',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  optionText: {
    fontFamily: 'outfit-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  scoreText: {
    fontFamily: 'outfit-Bold',
    fontSize: 22,
    color: '#004aad',
    textAlign: 'center',
  },
});
