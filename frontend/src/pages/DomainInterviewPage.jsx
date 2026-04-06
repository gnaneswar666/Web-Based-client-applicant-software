import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/TechnicalInterview.css';

const DomainInterviewPage = () => {
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
    "Focus on practical implementation details.",
    "Explain your architectural decisions clearly.",
    "Consider scalability and performance implications.",
    "Discuss trade-offs in your solutions.",
    "Highlight your experience with relevant technologies.",
    "Demonstrate understanding of best practices.",
    "Show awareness of security considerations.",
    "Explain your testing and quality assurance approach.",
    "Discuss monitoring and maintenance strategies."
  ];

  const interviewMainCategories = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: '🎨',
      topics: [
        {
          id: 'frontend_react',
          name: 'React & Modern Frameworks',
          questions: [
            'Explain the Virtual DOM and how it works in React.',
            'How do you handle state management in large applications?',
            'Describe your approach to component design and reusability.',
            'How do you optimize frontend performance?'
          ]
        },
        {
          id: 'frontend_ui',
          name: 'UI/UX & Design Systems',
          questions: [
            'How do you ensure consistency across a large application?',
            'Describe your approach to responsive design.',
            'How do you handle accessibility in your applications?',
            'Explain your process for implementing design systems.'
          ]
        }
      ]
    },
    {
      id: 'backend',
      name: 'Backend Architecture',
      icon: '⚙️',
      topics: [
        {
          id: 'backend_api',
          name: 'API Design & Development',
          questions: [
            'How do you design RESTful APIs?',
            'Explain your approach to API versioning.',
            'How do you handle API security?',
            'Describe your strategy for API documentation.'
          ]
        },
        {
          id: 'backend_services',
          name: 'Microservices & Architecture',
          questions: [
            'When would you choose microservices over monolithic architecture?',
            'How do you handle service discovery and communication?',
            'Explain your approach to data consistency across services.',
            'How do you manage deployment and scaling?'
          ]
        }
      ]
    },
    {
      id: 'database',
      name: 'Database & Data Management',
      icon: '🗄️',
      topics: [
        {
          id: 'db_design',
          name: 'Database Design',
          questions: [
            'How do you approach database schema design?',
            'Explain your strategy for database normalization.',
            'How do you handle database migrations?',
            'Describe your approach to database optimization.'
          ]
        },
        {
          id: 'db_advanced',
          name: 'Advanced Data Management',
          questions: [
            'How do you handle data consistency in distributed systems?',
            'Explain your approach to caching strategies.',
            'How do you manage database backups and recovery?',
            'Describe your experience with different database types.'
          ]
        }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud & DevOps',
      icon: '☁️',
      topics: [
        {
          id: 'cloud_aws',
          name: 'Cloud Services & Architecture',
          questions: [
            'Describe your experience with cloud platforms (AWS/Azure/GCP).',
            'How do you design for high availability?',
            'Explain your approach to cloud security.',
            'How do you optimize cloud costs?'
          ]
        },
        {
          id: 'cloud_devops',
          name: 'DevOps & Infrastructure',
          questions: [
            'Describe your CI/CD pipeline setup.',
            'How do you handle infrastructure as code?',
            'Explain your monitoring and logging strategy.',
            'How do you ensure deployment reliability?'
          ]
        }
      ]
    }
  ];

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

  return (
    <div className="technical-interview-container">
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

export default DomainInterviewPage; 