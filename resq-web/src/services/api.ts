import axios, { AxiosRequestConfig, Method } from 'axios';
import { getAuthToken } from '../utils/auth';

const API_BASE_URL = 'https://resq-yafg.onrender.com';

const request = async (
  method: Method,
  url: string,
  data?: any,
  useAuth = false,
  customHeaders: Record<string, string> = {}
): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (useAuth) {
      const token = await getAuthToken();
      if (!token) throw new Error('Authentication token is required.');
      headers.Authorization = `Bearer ${token}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      headers,
    };

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error(`API Error [${method} ${url}]`, error.response?.data || error.message);
    throw error.response?.data || error.message || 'Unexpected error occurred';
  }
};

// Services
export const contactsService = {
  addContact: (data: any) => request('POST', '/contacts/add', data, true),
  getContacts: () => request('GET', '/contacts', undefined, true),
  getContactById: (id: number) => request('GET', `/contacts/${id}`, undefined, true),
  updateContact: (id: number, data: any) => request('PATCH', `/contacts/${id}`, data, true),
  deleteContact: (id: number) => request('DELETE', `/contacts/${id}`, undefined, true),
};

export const alertsService = {
  triggerAlert: (data: any) => request('POST', '/alerts/trigger', data, true),
  getAlerts: () => request('GET', '/alerts', undefined, true),
  getAlertById: (id: number) => request('GET', `/alerts/${id}`, undefined, true),
  updateAlertStatus: (id: number, data: any) => request('PATCH', `/alerts/${id}`, data, true),
  deleteAlert: (id: number) => request('DELETE', `/alerts/${id}`, undefined, true),
};

export const botService = {
  getFirstAidResponse: async (query: string, token: string | null) => {
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    return request('POST', '/bot/first-aid', { query }, false, headers);
  },
};

export const authService = {
  signup: (data: any) => request('POST', '/auth/signup', data),
  login: (data: any) => request('POST', '/auth/login', data),
};