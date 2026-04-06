import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { fetchQuestions, submitResponse } from '../services/interviewService';
// You'll likely want to create a new CSS file for this page or add to an existing one
// import '../styles/InterviewSimulatorPage.css'; 

const InterviewSimulationPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // const [responses, setResponses] = useState([]); // We'll replace this with feedback logic

  // New states for timer, answer, and feedback
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { accuracy: number, tips: string[], timeTaken: number, questionText: string }
  const timerRef = useRef(null); // To hold the interval ID

  // Predefined improvement tips (can be expanded)
  const improvementTipsList = [
    "Consider edge cases more thoroughly.",
    "Try to optimize your solution for time complexity.",
    "Explain your thought process clearly before coding.",
    "Break down the problem into smaller, manageable parts.",
    "Practice writing cleaner and more readable code.",
    "Think about space complexity as well.",
    "Test your solution with various inputs, including empty or null values.",
    "Ensure your variable names are descriptive.",
    "Double-check your logic for off-by-one errors."
  ];

  useEffect(() => {
    loadNextQuestion();
  }, []);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current); // Cleanup
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetForNewQuestion = () => {
    setUserAnswer('');
    setFeedback(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const loadNextQuestion = async () => {
    resetForNewQuestion();
    try {
      // Assuming fetchQuestions returns a single question object like { id: '...', text: '...' }
      const question = await fetchQuestions(); 
      setCurrentQuestion(question);
      if (question) {
        setIsTimerRunning(true); // Start timer when question is loaded
      }
    } catch (error) {
      console.error('Error fetching question', error);
      setCurrentQuestion({ text: 'Failed to load question. Please try again.' }); // Show error
      setIsTimerRunning(false);
    }
  };

  const handleResponseSubmit = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    setIsTimerRunning(false); // Stop the timer
    const timeTaken = timer;

    // Mocking feedback generation
    const accuracy = Math.floor(Math.random() * 46) + 50; // Random accuracy 50-95%
    const randomTipIndex1 = Math.floor(Math.random() * improvementTipsList.length);
    let randomTipIndex2 = Math.floor(Math.random() * improvementTipsList.length);
    while (randomTipIndex2 === randomTipIndex1) { // Ensure two different tips
        randomTipIndex2 = Math.floor(Math.random() * improvementTipsList.length);
    }
    const tips = [improvementTipsList[randomTipIndex1], improvementTipsList[randomTipIndex2]];

    setFeedback({
      questionText: currentQuestion.text,
      accuracy,
      tips,
      timeTaken
    });

    // If you still want to submit to backend, you can do it here
    // try {
    //   await submitResponse({
    //     questionId: currentQuestion.id,
    //     responseText: userAnswer,
    //     timeTaken: timeTaken
    //   });
    // } catch (error) {
    //   console.error('Error submitting response', error);
    // }
  };

  return (
    <div className="interview-simulation-container"> {/* Ensure this class exists in your CSS */} 
      <h2>Interview Simulation</h2>

      {feedback ? (
        <div className="feedback-section"> {/* Add styles for this class */} 
          <h3>Feedback for:</h3>
          <p><em>{feedback.questionText}</em></p>
          <p><strong>Time Taken:</strong> {formatTime(feedback.timeTaken)}</p>
          <p><strong>Mock Accuracy:</strong> {feedback.accuracy}%</p>
          <p><strong>Areas to Improve:</strong></p>
          <ul>
            {feedback.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <button onClick={loadNextQuestion} className="action-button">Next Question</button>
        </div>
      ) : currentQuestion ? (
        <div className="question-area"> {/* Add styles for this class */} 
          <div className="timer-display">Time: {formatTime(timer)}</div> {/* Add styles */} 
          <p className="question-text">{currentQuestion.text}</p> {/* Add styles */} 
          <textarea 
            className="answer-textarea" /* Add styles */
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows="8"
          />
          <button 
            onClick={handleResponseSubmit} 
            disabled={!userAnswer.trim()}
            className="action-button submit-answer-button" /* Add styles */
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default InterviewSimulationPage;