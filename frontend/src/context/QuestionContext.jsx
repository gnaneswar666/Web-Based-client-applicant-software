import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/apiConfig';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/questions/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data);
      localStorage.setItem('cachedQuestions', JSON.stringify(data));
    } catch (error) {
      setError(error.message);
      // Try to load from cache if network request fails
      const cachedData = localStorage.getItem('cachedQuestions');
      if (cachedData) {
        setQuestions(JSON.parse(cachedData));
      }
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (newQuestion) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/questions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newQuestion,
          userId: localStorage.getItem('userId') // Add user ID if needed
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add question');
      }

      const savedQuestion = await response.json();
      const updatedQuestions = [...questions, savedQuestion];
      setQuestions(updatedQuestions);
      localStorage.setItem('cachedQuestions', JSON.stringify(updatedQuestions));
      return { success: true, data: savedQuestion };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      const updatedQuestions = questions.filter(q => q._id !== questionId);
      setQuestions(updatedQuestions);
      localStorage.setItem('cachedQuestions', JSON.stringify(updatedQuestions));
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  return (
    <QuestionContext.Provider value={{ 
      questions, 
      addQuestion, 
      deleteQuestion, 
      loading, 
      error,
      refreshQuestions: fetchQuestions 
    }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);