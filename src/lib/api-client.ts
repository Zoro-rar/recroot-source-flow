
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

// Get the API URL from environment variables or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/auth/login';
    }
    
    const errorMessage = 
      response && response.data.message 
        ? response.data.message 
        : 'Network error occurred';
    
    toast({
      variant: 'destructive',
      title: 'Error',
      description: errorMessage,
    });
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await apiClient.put('/auth/updatedetails', userData);
    return response.data;
  },
  
  updatePassword: async (currentPassword: string, newPassword: string) => {
    const response = await apiClient.put('/auth/updatepassword', { 
      currentPassword, 
      newPassword 
    });
    return response.data;
  }
};

// Candidates API endpoints
export const candidatesAPI = {
  getAllCandidates: async (page = 1, limit = 10) => {
    const response = await apiClient.get(`/candidates?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getCandidate: async (id: string) => {
    const response = await apiClient.get(`/candidates/${id}`);
    return response.data;
  },
  
  createCandidate: async (candidateData: any) => {
    const response = await apiClient.post('/candidates', candidateData);
    return response.data;
  },
  
  updateCandidate: async (id: string, candidateData: any) => {
    const response = await apiClient.put(`/candidates/${id}`, candidateData);
    return response.data;
  },
  
  deleteCandidate: async (id: string) => {
    const response = await apiClient.delete(`/candidates/${id}`);
    return response.data;
  },
  
  searchCandidates: async (searchParams: any) => {
    const queryString = new URLSearchParams(searchParams).toString();
    const response = await apiClient.get(`/candidates/search?${queryString}`);
    return response.data;
  },
  
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await apiClient.post('/candidates/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  }
};

export default apiClient;
