import axios from 'axios';
import { getAuthToken } from '../utils/auth'; // Import function to get token

const API_BASE_URL = 'https://resq-yafg.onrender.com';

// Generic function to handle API requests
const request = async (
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    url: string,
    data?: any,
    useAuth = false,
    headers: { [key: string]: string } = {}
) => {
    try {
        // Use provided headers, or default to common headers
        const requestHeaders: { [key: string]: string } = {
            'Content-Type': 'application/json',
            ...headers, // Merge provided headers with default Content-Type
        };

        if (useAuth) {
            const token = await getAuthToken(); // Get the token
            if (token) {
                requestHeaders.Authorization = `Bearer ${token}`;
            } else {
                throw new Error('Authentication token is required'); // Handle error
            }
        }

        const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data,
            headers: requestHeaders, // Use the combined headers
        });

        return response.data;
    } catch (error: any) {
        console.error(`API request to ${url} failed:`, error.response?.data || error.message);
        throw error.response?.data || error.message || 'An error occurred'; // Improved error
    }
};

// Contacts Service
export const contactsService = {
    addContact: (contactData: any) => request('POST', '/contacts', contactData, true),
    getContacts: () => request('GET', '/contacts', undefined, true),
    getContactById: (id: string) => request('GET', `/contacts/${id}`, undefined, true),
    updateContact: (id: string, contactData: any) => request('PATCH', `/contacts/${id}`, contactData, true),
    deleteContact: (id: string) => request('DELETE', `/contacts/${id}`, undefined, true),
};

// Alerts Service
export const alertsService = {
    triggerAlert: (alertData: any) => request('POST', '/alerts/trigger', alertData, true),
    getAlerts: () => request('GET', '/alerts', undefined, true),
    getAlertById: (id: string) => request('GET', `/alerts/${id}`, undefined, true),
    updateAlertStatus: (id: string, alertData: any) => request('PATCH', `/alerts/${id}`, alertData, true),
    deleteAlert: (id: string) => request('DELETE', `/alerts/${id}`, undefined, true),
};

// Bot Service
export const botService = {
    getFirstAidResponse: (query: string, token: string | null) => {
        const headers: { [key: string]: string } = {}; // Start with empty headers
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return request('POST', '/bot/first-aid', { query }, false, headers); // Pass headers to request
    },
};

// AuthService
export const authService = {
    signup: (userData: any) => request('POST', '/auth/signup', userData), // No auth needed for signup
    login: (userData: any) => request('POST', '/auth/login', userData), // No auth needed for login
};