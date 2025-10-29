import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // If time hits zero: reset timer and trigger onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; // Exit early so no new timer starts this cycle
    }

    // Create a timer to decrement every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup to clear the timeout before next render or unmount
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  return (
    <div className="question">
      <h2>{question.prompt}</h2>
      <div className="answers">
        {question.answers.map((answer) => (
          <button
            key={answer}
            onClick={() => {
              onAnswered(answer === question.correctAnswer);
              setTimeRemaining(10); // reset timer for next question
            }}
          >
            {answer}
          </button>
        ))}
      </div>
      <h5>{timeRemaining} seconds remaining</h5>
    </div>
  );
}

export default Question;

