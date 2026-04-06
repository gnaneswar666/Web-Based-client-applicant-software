import axios from "axios";

const API_URL = "http://localhost:5002/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the full error response
    console.error('API Error Response:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });

    // Enhance error object with response data
    if (error.response?.data) {
      error.message = error.response.data.message || error.response.data.error || error.message;
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    try {
      console.log('Making registration request to:', `${API_URL}/auth/register`);
      console.log('Registration data:', JSON.stringify(userData, null, 2));
      
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const questionsAPI = {
  getQuestions: async (filters = {}) => {
    try {
      const { category, difficulty, search } = filters;
      const params = new URLSearchParams();
      
      if (category && category !== 'all') params.append('category', category);
      if (difficulty && difficulty !== 'all') params.append('difficulty', difficulty);
      if (search) params.append('search', search);

      const response = await api.get('/questions?' + params.toString());
      return response.data;
    } catch (error) {
      console.error('Failed to fetch questions:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  getQuestionById: async (id) => {
    try {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch question:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }
};

export default api;