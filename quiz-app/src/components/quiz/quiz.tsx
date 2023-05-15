import { useEffect, useState } from "react";

interface Answer {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizProps {
  questions: Answer[];
  onRestart: () => void;
  loading: boolean;
}

export default function Quiz({ questions, onRestart, loading }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerClicked, setAnswerClicked] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (questions.length > currentQuestion) {
      setShuffledAnswers(
        shuffleArray([
          ...questions[currentQuestion].incorrect_answers,
          questions[currentQuestion].correct_answer,
        ])
      );
    }
  }, [questions, currentQuestion]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswerClicked(true);
    setTimeout(() => {
      if (answer === questions[currentQuestion].correct_answer) {
        setScore(score + 1);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswerClicked(false);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    onRestart();
    setAnswerClicked(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : gameOver ? (
        <>
          <p className="text-white mb-4">
            Wrong, your final score is:{" "}
            <span className="text-green-300">{score}</span>
          </p>
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            Play again
          </button>
        </>
      ) : (
        <>
          <p className="text-white mb-4 text-4xl">
            Question{" "}
            <span className="text-green-300">{currentQuestion + 1}</span> /{" "}
            {questions.length}
          </p>
          <p className="px-4 py-2 rounded bg-gray-300 mb-4">
            Score: <span className="text-green-600">{score}</span>
          </p>
          {questions.length > currentQuestion && (
            <>
              <p className="text-white mb-4 ">
                Difficulty:
                <span className="text-green-300">
                  {" "}
                  {questions[currentQuestion].difficulty}
                </span>
              </p>
              <p className="text-white mb-4 ">
                Category:
                <span className="text-green-300">
                  {" "}
                  {questions[currentQuestion].category}
                </span>
              </p>

              <p
                className="text-green-300 mb-4"
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestion].question,
                }}
              />
              {shuffledAnswers.map((answer) => (
                <button
                  key={answer}
                  onClick={() => handleAnswerClick(answer)}
                  className={`px-4 py-2 rounded focus:outline-none mb-2 w-52 ${
                    answerClicked
                      ? answer === questions[currentQuestion].correct_answer
                        ? "bg-green-500"
                        : selectedAnswer === answer
                        ? "bg-red-500"
                        : "bg-gray-300"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
