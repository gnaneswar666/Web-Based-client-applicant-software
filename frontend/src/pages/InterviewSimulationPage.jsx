import React, { useState, useEffect } from 'react';

import '../styles/InterviewSimulationPage.css';

// Define or import getRandomTimeForQuestion function here or from a utils file
const getRandomTimeForQuestion = (questionType) => {
  let maxTimeInSeconds;
  const MIN_TIME_SECONDS = 60; // Minimum 1 minute for any question
  const ABSOLUTE_MAX_SECONDS = 359; // Strictly less than 6 minutes (360 seconds)

  switch (questionType) {
    case 'technical':
      maxTimeInSeconds = 300; // e.g., up to 5 minutes
      break;
    case 'behavioral':
      maxTimeInSeconds = 240; // e.g., up to 4 minutes
      break;
    case 'domain-specific': // Example type
      maxTimeInSeconds = 330; // e.g., up to 5.5 minutes
      break;
    default:
      maxTimeInSeconds = 180; // e.g., up to 3 minutes
  }
  const effectiveMaxTime = Math.min(maxTimeInSeconds, ABSOLUTE_MAX_SECONDS);
  if (MIN_TIME_SECONDS > effectiveMaxTime) {
    return effectiveMaxTime;
  }
  return Math.floor(Math.random() * (effectiveMaxTime - MIN_TIME_SECONDS + 1)) + MIN_TIME_SECONDS;
};

const InterviewSimulationPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sample questions object
  const questions = {
    technical: [
      "Explain the concept of closures in JavaScript.",
      "What is the difference between let, const, and var?",
      "How does event delegation work?",
    ],
    behavioral: [
      "Tell me about a challenging project you worked on.",
      "How do you handle conflicts in a team?",
      "Describe a situation where you had to learn something quickly.",
    ],
  };

  // Format time function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle interview start
  const handleStartInterview = () => {
    if (selectedType) {
      setInterviewStarted(true);
      const newTime = getRandomTimeForQuestion(selectedType);
      setTimeLeft(newTime);
      setIsTimerRunning(true);
    }
  };

  // Handle interview end
  const handleEndInterview = () => {
    setShowFeedback(true);
    setIsTimerRunning(false);
  };

  // Handle response submission
  const handleSubmitResponse = () => {
    if (currentQuestion < questions[selectedType].length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setResponse('');
      const newTime = getRandomTimeForQuestion(selectedType);
      setTimeLeft(newTime);
    } else {
      handleEndInterview();
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      handleSubmitResponse();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  if (!selectedType && !interviewStarted) {
    return (
      <div className="interview-selection">
        <h1>Select Interview Type</h1>
        <div className="interview-types">
          <button 
            className={`type-btn ${selectedType === 'technical' ? 'selected' : ''}`}
            onClick={() => setSelectedType('technical')}
            data-type="technical"
          >
            Technical Interview
          </button>
          <button 
            className={`type-btn ${selectedType === 'behavioral' ? 'selected' : ''}`}
            onClick={() => setSelectedType('behavioral')}
            data-type="behavioral"
          >
            Behavioral Interview
          </button>
        </div>
        {selectedType && (
          <button className="start-btn" onClick={handleStartInterview}>
            Start Interview
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="interview-simulation">
      <div className="interview-header">
        <div className="timer">
          Time Remaining: {formatTime(timeLeft)}
        </div>
        <button className="end-button" onClick={handleEndInterview}>
          End Interview
        </button>
      </div>

      <div className="question-section">
        <h2>Question {currentQuestion + 1} of {questions[selectedType].length}</h2>
        <p className="question">{questions[selectedType][currentQuestion]}</p>
      </div>

      <div className="response-section">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your response here..."
          rows={6}
        />
        <button className="submit-button" onClick={handleSubmitResponse}>
          {currentQuestion < questions[selectedType].length - 1 ? 'Next Question' : 'Submit'}
        </button>
      </div>

      {showFeedback && (
        <div className="feedback-section">
          <h2>Interview Complete!</h2>
          <div className="feedback-content">
            <div className="score">
              <h3>Your Score</h3>
              <span className="score-value">85%</span>
            </div>
            <div className="feedback-details">
              <div className="strengths">
                <h3>Strengths</h3>
                <ul>
                  <li>Clear communication</li>
                  <li>Technical knowledge</li>
                  <li>Problem-solving approach</li>
                </ul>
              </div>
              <div className="improvements">
                <h3>Areas for Improvement</h3>
                <ul>
                  <li>Time management</li>
                  <li>Code optimization</li>
                  <li>System design depth</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulationPage;