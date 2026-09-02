import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const API_BASE = API_BASE_URL;

// Get token from localStorage
export const getAuthToken = () => localStorage.getItem('adminToken');
export const setAuthToken = (token) => {
  if (token) localStorage.setItem('adminToken', token);
  else localStorage.removeItem('adminToken');
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// --- File Upload API ---
export const uploadFileApi = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        ...getAuthHeaders().headers,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to upload file' };
  }
};

// Admin Auth APIs
export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, { username, password });
    if (response.data?.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Login failed' };
  }
};

export const forgotPasswordApi = async (usernameOrEmail) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/forgot-password`, { usernameOrEmail });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Failed to request password reset' };
  }
};

export const resetPasswordApi = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Failed to reset password' };
  }
};

export const verifyAdminToken = async () => {
  try {
    const token = getAuthToken();
    if (!token) return { success: false };
    const response = await axios.get(`${API_BASE}/auth/verify`, getAuthHeaders());
    return response.data;
  } catch (error) {
    setAuthToken(null);
    return { success: false };
  }
};

export const logoutAdmin = () => {
  setAuthToken(null);
};

// --- Profile & Site Settings APIs ---
export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {};
  }
};

export const updateProfileApi = async (profileData) => {
  try {
    const response = await axios.put(`${API_BASE}/profile`, profileData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update profile settings' };
  }
};

// --- Gallery & Certificates CRUD APIs ---
export const fetchGallery = async () => {
  try {
    const response = await axios.get(`${API_BASE}/gallery`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
};

export const addGalleryApi = async (itemData) => {
  try {
    const response = await axios.post(`${API_BASE}/gallery`, itemData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add gallery item' };
  }
};

export const updateGalleryApi = async (id, itemData) => {
  try {
    const response = await axios.put(`${API_BASE}/gallery/${id}`, itemData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update gallery item' };
  }
};

export const deleteGalleryApi = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/gallery/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete gallery item' };
  }
};

// --- Projects CRUD APIs ---
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const addProjectApi = async (projectData) => {
  try {
    const response = await axios.post(`${API_BASE}/projects`, projectData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add project' };
  }
};

export const updateProjectApi = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_BASE}/projects/${id}`, projectData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update project' };
  }
};

export const deleteProjectApi = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/projects/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete project' };
  }
};

// --- Skills CRUD APIs ---
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_BASE}/skills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

export const addSkillApi = async (skillData) => {
  try {
    const response = await axios.post(`${API_BASE}/skills`, skillData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add skill' };
  }
};

export const updateSkillApi = async (id, skillData) => {
  try {
    const response = await axios.put(`${API_BASE}/skills/${id}`, skillData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update skill' };
  }
};

export const deleteSkillApi = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/skills/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete skill' };
  }
};

// --- Experience CRUD APIs ---
export const fetchExperience = async () => {
  try {
    const response = await axios.get(`${API_BASE}/experience`);
    return response.data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
};

export const addExperienceApi = async (expData) => {
  try {
    const response = await axios.post(`${API_BASE}/experience`, expData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add experience' };
  }
};

export const updateExperienceApi = async (id, expData) => {
  try {
    const response = await axios.put(`${API_BASE}/experience/${id}`, expData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update experience' };
  }
};

export const deleteExperienceApi = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/experience/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete experience' };
  }
};

// --- Contact Messages APIs ---
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error.response?.data || { success: false, error: 'Network error submitting form' };
  }
};

export const fetchContactMessages = async () => {
  try {
    const response = await axios.get(`${API_BASE}/contact`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/contact/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    return { success: false };
  }
};

export const fetchServerStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE}/status`);
    return response.data;
  } catch (error) {
    return { status: 'Offline', database: { isConnected: false } };
  }
};
