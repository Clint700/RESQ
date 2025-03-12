import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const triggerEmergency = async (userId, location) => {
  return axios.post(`${API_BASE_URL}/emergency/trigger`, { userId, location });
};

export const getEmergencyRequests = async () => {
  return axios.get(`${API_BASE_URL}/emergency/requests`);
};

export const addContact = async (userId, name, phoneNumber) => {
  return axios.post(`${API_BASE_URL}/contacts/add`, { userId, name, phoneNumber });
};

export const getFirstAidGuidance = async (query) => {
  return axios.post(`${API_BASE_URL}/bot/first-aid`, { query });
};

export const getLocation = async () => {
  return axios.get(`${API_BASE_URL}/location`);
};
