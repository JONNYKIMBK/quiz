"use client";

import { useState } from "react";
import Quiz from "../quiz/quiz";
import Links from "../links/links";

interface Answer {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Answers {
  response_code: number;
  results: Answer[];
}

export default function QuizAPI() {
  const [answers, setAnswers] = useState<Answers>({
    response_code: 0,
    results: [],
  });
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const fetchQuestions = () => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=30&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setAnswers(data);
        setLoading(false);
      });
  };

  const handleStartGame = () => {
    setGameStarted(true);
    fetchQuestions();
  };

  return (
    <div>
      <Links />

      {gameStarted ? (
        <Quiz
          questions={answers.results}
          onRestart={fetchQuestions}
          loading={loading}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
          <h1 className="text-4xl text-white mb-4">Quiz</h1>
          <button
            onClick={handleStartGame}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            Start game
          </button>
        </div>
      )}
    </div>
  );
}
