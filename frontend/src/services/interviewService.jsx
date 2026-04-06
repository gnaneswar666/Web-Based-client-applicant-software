import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions/next`);
  return response.data;
};

export const submitResponse = async (responseData) => {
  const response = await axios.post(`${API_BASE_URL}/responses`, responseData);
  return response.data;
};