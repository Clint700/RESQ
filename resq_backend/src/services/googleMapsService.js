const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getLocation = async (address) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    return response.data.results[0].geometry.location;
  } catch (error) {
    throw new Error('Error fetching location');
  }
};
