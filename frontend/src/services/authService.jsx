import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api/auth';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};