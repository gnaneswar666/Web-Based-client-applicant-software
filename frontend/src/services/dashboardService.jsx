import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/dashboard';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats', error);
    throw error;
  }
};

export const getRecentInterviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recent-interviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent interviews', error);
    throw error;
  }
};

export const getSkillProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/skill-progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skill progress', error);
    throw error;
  }
};