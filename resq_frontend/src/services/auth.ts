import axios from 'axios';
import { saveAuthToken } from '../utils/auth'; // Import the saveAuthToken function

// Define the API base URL
const API_BASE_URL = 'https://resq-yafg.onrender.com';

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    if (response.status === 200) {
      const { token } = response.data;
      await saveAuthToken(token);     
      return response.data;
    } else {
      throw new Error(`Login failed with status code: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to sign up a user
export const signupUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
    if (response.status === 201) {
      console.log('Signup successful:', response.data);
      return response.data;
    } else {
      throw new Error(`Signup failed with status code: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw error;
  }
};
