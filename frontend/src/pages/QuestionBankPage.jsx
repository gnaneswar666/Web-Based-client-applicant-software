import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import '../styles/QuestionBankPage.css';

function QuestionBankPage() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    category: '',
    difficulty: 'Medium',
    text: '',
    expectedDuration: 5
  });

  // Categories and difficulties as constants
  const CATEGORIES = ['Technical', 'HR', 'Problem Solving', 'System Design'];
  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  // Fetch questions (simulated)
  useEffect(() => {
    const mockQuestions = [
      // Technical Questions
      {
        id: '1',
        category: 'Technical',
        difficulty: 'Hard',
        text: 'Explain the practical use of the Laws of Thermodynamics. Tip: Discuss real-world applications, such as energy conservation in engines (First Law) or efficiency limits of refrigerators (Second Law).',
        expectedDuration: 10
      },
      {
        id: '2',
        category: 'Technical',
        difficulty: 'Medium',
        text: 'What are the various loads acting on a car while it is moving on the road? Tip: Mention forces like gravitational force, frictional force, air resistance, and engine thrust, explaining their effects on motion.',
        expectedDuration: 8
      },
      {
        id: '3',
        category: 'Technical',
        difficulty: 'Medium',
        text: 'Describe your final year project and its potential applications. Tip: Provide a concise overview of your project, emphasizing its objectives, methodologies, and real-world relevance.',
        expectedDuration: 7
      },
      // HR Questions
      {
        id: '4',
        category: 'HR',
        difficulty: 'Medium',
        text: 'Why do you want to join DRDO? Tip: Highlight your passion for defense research, alignment with DRDO\'s mission, and how you envision contributing to national security.',
        expectedDuration: 5
      },
      {
        id: '5',
        category: 'HR',
        difficulty: 'Medium',
        text: 'Where do you see yourself in five years? Tip: Discuss your professional goals, emphasizing growth within DRDO and taking on roles that contribute significantly to its projects.',
        expectedDuration: 5
      },
      {
        id: '6',
        category: 'HR',
        difficulty: 'Easy',
        text: 'How do you handle stress and tight deadlines? Tip: Share specific strategies like time management, prioritization, and maintaining a healthy work-life balance.',
        expectedDuration: 5
      }
    ];
    setQuestions(mockQuestions);
    setFilteredQuestions(mockQuestions);
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = questions;

    if (selectedCategory !== 'All') {
      result = result.filter(q => q.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      result = result.filter(q => q.difficulty === selectedDifficulty);
    }

    setFilteredQuestions(result);
  }, [selectedCategory, selectedDifficulty, questions]);

  // Add new question
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.text || !newQuestion.category) {
      alert('Please fill in all required fields');
      return;
    }

    const questionToAdd = {
      ...newQuestion,
      id: `q-${Date.now()}`,
      difficulty: newQuestion.difficulty || 'Medium',
      expectedDuration: newQuestion.expectedDuration || 5
    };

    setQuestions(prevQuestions => [...prevQuestions, questionToAdd]);
    setShowAddForm(false);
    
    // Reset form
    setNewQuestion({
      category: '',
      difficulty: 'Medium',
      text: '',
      expectedDuration: 5
    });
  };

  // Delete question
  const handleDeleteQuestion = (id) => {
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
  };

  return (
    <div className="question-bank-container">
      <BackButton />
      <div className="question-bank-header">
        <h1>Question Bank</h1>
        <button 
          className="add-question-button"
          onClick={() => setShowAddForm(true)}
        >
          Add Question
        </button>
      </div>

      <div className="filters">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select 
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Difficulties</option>
          {DIFFICULTIES.map(diff => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      {showAddForm && (
        <div className="add-question-form">
          <h2>Add New Question</h2>
          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label>Category:</label>
              <select
                value={newQuestion.category}
                onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty:</label>
              <select
                value={newQuestion.difficulty}
                onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
              >
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Question Text:</label>
              <textarea
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Expected Duration (minutes):</label>
              <input
                type="number"
                value={newQuestion.expectedDuration}
                onChange={(e) => setNewQuestion({...newQuestion, expectedDuration: Number(e.target.value)})}
                min="1"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">Save Question</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="questions-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Question</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.category}</td>
                <td>
                  <span className={`difficulty-badge ${question.difficulty.toLowerCase()}`}>
                    {question.difficulty}
                  </span>
                </td>
                <td>{question.text}</td>
                <td>{question.expectedDuration} mins</td>
                <td>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuestionBankPage;