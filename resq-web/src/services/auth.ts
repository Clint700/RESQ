import axios from 'axios';

// Define the API base URL (Replace with your actual backend URL)
const API_BASE_URL = 'http://localhost:3000'; // Change this to your backend URL

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

    if (response.status === 200) {
      console.log('Login successful:', response.data);
      return response.data; // Assuming the backend returns user data or a token
    } else {
      throw new Error(`Failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to sign up a user
export const signupUser = async (username: any, password: any) => {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    if (!response.ok) throw new Error('Signup failed');
    return await response.json();
  };
