import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/TechnicalInterview.css';

const TechnicalInterviewPage = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  // New states for timer, answer, and feedback
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { accuracy: number, tips: string[], timeTaken: number }
  const timerRef = useRef(null); // To hold the interval ID

  // Add state for accuracy tracking
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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

  // Renamed and restructured data
  const interviewMainCategories = [
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      icon: '🔍',
      topics: [
        {
          id: 'dsa_arrays',
          name: 'Arrays & Strings',
          questions: [
            'Implement a binary search algorithm for a sorted array.',
            'Write a program to find the longest palindromic substring in a given string.',
            'Given an array of integers, find two numbers that add up to a target sum.',
            'Find the longest substring without repeating characters.'
          ]
        },
        {
          id: 'dsa_linkedlist',
          name: 'Linked Lists',
          questions: [
            'Create a function to detect a cycle in a linked list.',
            'Implement a function to reverse a linked list (iterative and recursive).',
            'Merge two sorted linked lists.'
          ]
        },
        {
          id: 'dsa_trees',
          name: 'Trees & Graphs',
          questions: [
            'Implement a binary search tree and its basic operations (insert, delete, search).',
            'Perform inorder, preorder, and postorder traversal of a binary tree.',
            'Find the lowest common ancestor (LCA) of two nodes in a BST.'
          ]
        },
         {
          id: 'dsa_sorting',
          name: 'Sorting & Searching',
          questions: [
            'Implement heap sort algorithm.',
            'Explain the time and space complexity of Merge Sort vs Quick Sort.',
            'Design an algorithm to find the kth largest element in an unsorted array.'
          ]
        }
      ]
    },
    {
      id: 'system',
      name: 'System Design',
      icon: '🏗️',
      topics: [
        {
          id: 'system_services',
          name: 'Web Services & APIs',
          questions: [
            'Design a URL shortening service like TinyURL.',
            'How would you design Instagram\'s backend, focusing on the photo feed?',
            'Create a high-level design for a real-time chat application like WhatsApp.'
          ]
        },
        {
          id: 'system_distributed',
          name: 'Distributed Systems',
          questions: [
            'Design a distributed cache system (e.g., Memcached, Redis).',
            'Explain the CAP theorem and its implications.',
            'How would you design a distributed key-value store?'
          ]
        },
        {
          id: 'system_large_scale',
          name: 'Large-Scale Systems',
          questions: [
            'Design a scalable social media feed system (e.g., Twitter, Facebook).',
            'How would you design a system like Netflix or YouTube for video streaming?',
            'Design a ride-sharing service like Uber or Lyft.'
          ]
        }
      ]
    },
    {
      id: 'implementation',
      name: 'Code Implementation',
      icon: '💻',
      topics: [
        {
          id: 'impl_js_funcs',
          name: 'JavaScript Core Functions',
          questions: [
            'Implement a debounce function from scratch.',
            'Create a throttle function from scratch.',
            'Implement a `Promise.all()` like function.'
          ]
        },
        {
          id: 'impl_patterns',
          name: 'Design Patterns & Utilities',
          questions: [
            'Implement a pub/sub (publish-subscribe) pattern in JavaScript.',
            'Build a basic event emitter class.',
            'Create a deep clone function for objects and arrays without using JSON methods.'
          ]
        }
      ]
    },
    {
      id: 'problem',
      name: 'Problem Solving',
      icon: '🧩',
      topics: [
        {
          id: 'problem_dp',
          name: 'Dynamic Programming',
          questions: [
            'Solve the coin change problem using dynamic programming.',
            'Find the length of the longest common subsequence of two strings.',
            'Implement a solution for the 0/1 Knapsack problem.'
          ]
        },
        {
          id: 'problem_algorithmic',
          name: 'Algorithmic Challenges',
          questions: [
            'Implement a solution for the N-Queens problem.',
            'Design an algorithm to find all prime numbers up to n (Sieve of Eratosthenes).',
            'Find the median of two sorted arrays of different sizes.'
          ]
        }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
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
      setIsTimerRunning(true); // Start timer when question is displayed
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
      setIsTimerRunning(true); // Restart timer for new question
      setTimer(0); // Reset timer for new question
    }
  };

  // Helper to save results to localStorage
  const saveInterviewResult = (result) => {
    const prevResults = JSON.parse(localStorage.getItem('interviewResults') || '[]');
    localStorage.setItem('interviewResults', JSON.stringify([...prevResults, result]));
  };

  const handleSubmitAnswer = () => {
    setIsTimerRunning(false); // Stop the timer
    const accuracy = Math.floor(Math.random() * 46) + 50; // Random accuracy 50-95%
    const randomTipIndex1 = Math.floor(Math.random() * improvementTipsList.length);
    let randomTipIndex2 = Math.floor(Math.random() * improvementTipsList.length);
    while (randomTipIndex2 === randomTipIndex1) { // Ensure two different tips
        randomTipIndex2 = Math.floor(Math.random() * improvementTipsList.length);
    }
    const tips = [improvementTipsList[randomTipIndex1], improvementTipsList[randomTipIndex2]];
    setFeedback({ accuracy, tips, timeTaken: timer });

    // Update accuracy tracking
    setTotalQuestions((prev) => prev + 1);
    if (accuracy >= 70) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Save result to localStorage
    const result = {
      date: new Date().toISOString(),
      totalQuestions: totalQuestions + 1, // +1 because setState is async
      correctAnswers: accuracy >= 70 ? correctAnswers + 1 : correctAnswers,
      accuracy: Math.round(((accuracy >= 70 ? correctAnswers + 1 : correctAnswers) / (totalQuestions + 1)) * 100)
    };
    saveInterviewResult(result);
  };

  // Save on unmount (when user leaves interview)
  useEffect(() => {
    return () => {
      if (totalQuestions > 0) {
        const result = {
          date: new Date().toISOString(),
          totalQuestions,
          correctAnswers,
          accuracy: Math.round((correctAnswers / totalQuestions) * 100)
        };
        saveInterviewResult(result);
      }
    };
  // eslint-disable-next-line
  }, [totalQuestions, correctAnswers]);

  const handleBack = () => {
    resetQuestionState(); // Reset timer and answer states
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

  return (
    <div className="technical-interview-container">
      <BackButton />
      
      {!selectedMainCategory ? (
        // Stage 1: Select Main Category (Interview Type)
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
        // Stage 2: Select Topic
        <>
          <h1>Select Topic for {selectedMainCategory.name}</h1>
          <div className="category-grid">
            {selectedMainCategory.topics.map((topic) => (
              <button
                key={topic.id}
                className="category-button" // Can reuse same styling
                onClick={() => handleTopicSelect(topic)}
              >
                {/* You might want a different or no icon for topics */}
                {/* <span className="category-icon">{topic.icon || '📄'}</span> */}
                <span className="category-name">{topic.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        // Stage 3: Display Question, Timer, Answer Input, Feedback
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
                disabled={!userAnswer.trim()} // Disable if no answer
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="feedback-section">
              <h3>Feedback</h3>
              <p><strong>Time Taken:</strong> {formatTime(feedback.timeTaken)}</p>
              <p><strong>Mock Accuracy:</strong> {feedback.accuracy}%</p>
              <p><strong>Areas to Improve:</strong></p>
              <ul>
                {feedback.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {feedback && (
            <div className="accuracy-section" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <strong>Current Accuracy:</strong> {totalQuestions > 0 ? `${Math.round((correctAnswers / totalQuestions) * 100)}% (${correctAnswers}/${totalQuestions} correct)` : 'N/A'}
            </div>
          )}

          <div className="action-buttons">
            <button className="action-button" onClick={handleNewQuestion}>
              Next Question
            </button>
            <button 
              className="action-button secondary"
              onClick={handleChangeMainCategory}
            >
              Change Interview Type
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalInterviewPage;