import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/TechnicalInterview.css';

const BehavioralInterviewPage = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const timerRef = useRef(null);

  const improvementTipsList = [
    "Use the STAR method (Situation, Task, Action, Result) to structure your response.",
    "Provide specific examples from your experience.",
    "Focus on your role and contributions in the situation.",
    "Highlight the impact and outcomes of your actions.",
    "Be honest and authentic in your responses.",
    "Show how you learned from challenges.",
    "Demonstrate your problem-solving approach.",
    "Emphasize collaboration and teamwork.",
    "Connect your experience to the role you're applying for."
  ];

  const interviewMainCategories = [
    {
      id: 'leadership',
      name: 'Leadership & Management',
      icon: '👥',
      topics: [
        {
          id: 'leadership_team',
          name: 'Team Leadership',
          questions: [
            'Describe a situation where you had to lead a team through a difficult project.',
            'How do you handle conflicts within your team?',
            'Tell me about a time when you had to make a tough decision as a leader.',
            'How do you motivate your team members?'
          ]
        },
        {
          id: 'leadership_change',
          name: 'Change Management',
          questions: [
            'Describe a time when you had to implement a significant change in your organization.',
            'How do you handle resistance to change?',
            'Tell me about a time when you had to adapt to a major change at work.',
            'How do you communicate changes to your team?'
          ]
        }
      ]
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: '🤝',
      topics: [
        {
          id: 'collab_teamwork',
          name: 'Teamwork & Communication',
          questions: [
            'Describe a successful team project you were part of.',
            'How do you handle disagreements with team members?',
            'Tell me about a time when you had to work with a difficult team member.',
            'How do you ensure effective communication within your team?'
          ]
        },
        {
          id: 'collab_cross',
          name: 'Cross-functional Collaboration',
          questions: [
            'Describe a time when you had to work with other departments.',
            'How do you build relationships with stakeholders?',
            'Tell me about a time when you had to collaborate with people from different backgrounds.',
            'How do you ensure alignment across different teams?'
          ]
        }
      ]
    },
    {
      id: 'problem',
      name: 'Problem Solving & Decision Making',
      icon: '🎯',
      topics: [
        {
          id: 'problem_critical',
          name: 'Critical Thinking',
          questions: [
            'Describe a complex problem you had to solve.',
            'How do you approach decision-making?',
            'Tell me about a time when you had to make a decision with incomplete information.',
            'How do you evaluate the success of your decisions?'
          ]
        },
        {
          id: 'problem_innovative',
          name: 'Innovation & Creativity',
          questions: [
            'Describe a time when you had to think outside the box.',
            'How do you foster innovation in your work?',
            'Tell me about a time when you had to adapt to a new situation.',
            'How do you handle unexpected challenges?'
          ]
        }
      ]
    }
  ];

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetQuestionState = () => {
    setUserAnswer('');
    setFeedback(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const handleMainCategorySelect = (mainCat) => {
    setSelectedMainCategory(mainCat);
    setSelectedTopic(null);
    setCurrentQuestion(null);
    resetQuestionState();
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    resetQuestionState();
    if (topic.questions && topic.questions.length > 0) {
      const randomQuestion = topic.questions[Math.floor(Math.random() * topic.questions.length)];
      setCurrentQuestion(randomQuestion);
      setIsTimerRunning(true);
    } else {
      setCurrentQuestion("No questions available for this topic yet.");
      setIsTimerRunning(false);
    }
  };

  const handleNewQuestion = () => {
    resetQuestionState();
    if (selectedTopic && selectedTopic.questions && selectedTopic.questions.length > 0) {
      const randomQuestion = selectedTopic.questions[
        Math.floor(Math.random() * selectedTopic.questions.length)
      ];
      setCurrentQuestion(randomQuestion);
      setIsTimerRunning(true);
    }
  };

  const handleSubmitAnswer = () => {
    setIsTimerRunning(false);
    const accuracy = Math.floor(Math.random() * 46) + 50;
    const randomTipIndex1 = Math.floor(Math.random() * improvementTipsList.length);
    let randomTipIndex2 = Math.floor(Math.random() * improvementTipsList.length);
    while (randomTipIndex2 === randomTipIndex1) {
      randomTipIndex2 = Math.floor(Math.random() * improvementTipsList.length);
    }
    const tips = [improvementTipsList[randomTipIndex1], improvementTipsList[randomTipIndex2]];
    setFeedback({ accuracy, tips, timeTaken: timer });

    // Update accuracy tracking
    setTotalQuestions((prev) => prev + 1);
    if (accuracy >= 70) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Save result to localStorage with type 'Behavioral'
    const result = {
      date: new Date().toISOString(),
      totalQuestions: totalQuestions + 1,
      correctAnswers: accuracy >= 70 ? correctAnswers + 1 : correctAnswers,
      accuracy: Math.round(((accuracy >= 70 ? correctAnswers + 1 : correctAnswers) / (totalQuestions + 1)) * 100),
      type: 'Behavioral'
    };
    saveInterviewResult(result);
  };

  const handleBack = () => {
    resetQuestionState();
    if (selectedTopic) {
      setSelectedTopic(null);
      setCurrentQuestion(null);
    } else if (selectedMainCategory) {
      setSelectedMainCategory(null);
    } else {
      navigate(-1);
    }
  };

  const handleChangeMainCategory = () => {
    resetQuestionState();
    setSelectedMainCategory(null);
    setSelectedTopic(null);
    setCurrentQuestion(null);
  };

  // Helper to save results to localStorage
  const saveInterviewResult = (result) => {
    const prevResults = JSON.parse(localStorage.getItem('interviewResults') || '[]');
    localStorage.setItem('interviewResults', JSON.stringify([...prevResults, result]));
  };

  // Save on unmount (when user leaves interview)
  useEffect(() => {
    return () => {
      if (totalQuestions > 0) {
        const result = {
          date: new Date().toISOString(),
          totalQuestions,
          correctAnswers,
          accuracy: Math.round((correctAnswers / totalQuestions) * 100),
          type: 'Behavioral'
        };
        saveInterviewResult(result);
      }
    };
  // eslint-disable-next-line
  }, [totalQuestions, correctAnswers]);

  return (
    <div className="behavioral-interview-container">
      <BackButton />
      {!selectedMainCategory ? (
        <>
          <h1>Select Interview Type</h1>
          <div className="category-grid">
            {interviewMainCategories.map((mainCat) => (
              <button
                key={mainCat.id}
                className="category-button"
                onClick={() => handleMainCategorySelect(mainCat)}
              >
                <span className="category-icon">{mainCat.icon}</span>
                <span className="category-name">{mainCat.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : !selectedTopic ? (
        <>
          <h1>Select Topic for {selectedMainCategory.name}</h1>
          <div className="category-grid">
            {selectedMainCategory.topics.map((topic) => (
              <button
                key={topic.id}
                className="category-button"
                onClick={() => handleTopicSelect(topic)}
              >
                <span className="category-name">{topic.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="question-section">
          <h2>{selectedMainCategory.name} - {selectedTopic.name}</h2>
          <div className="timer-display">Time: {formatTime(timer)}</div>
          <div className="question-card">
            <h3>Question:</h3>
            <p>{currentQuestion}</p>
          </div>

          {!feedback ? (
            <div className="answer-section">
              <textarea
                className="answer-textarea"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows="8"
              />
              <button 
                className="action-button submit-answer-button" 
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="feedback-section">
              <h3>Feedback</h3>
              <p><strong>Time Taken:</strong> {formatTime(feedback.timeTaken)}</p>
              <p><strong>Mock Accuracy:</strong> {feedback.accuracy}%</p>
              <p><strong>Tips for Improvement:</strong></p>
              <ul>
                {feedback.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              <div className="action-buttons">
                <button 
                  className="action-button" 
                  onClick={handleNewQuestion}
                >
                  Next Question
                </button>
                <button 
                  className="action-button secondary" 
                  onClick={handleChangeMainCategory}
                >
                  Change Category
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BehavioralInterviewPage; 