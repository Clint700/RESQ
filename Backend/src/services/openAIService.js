const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

exports.getCompletion = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        prompt,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );
    console.log(response.data.choices[0].text.trim());
    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error('Error fetching completion from OpenAI');
  }
};
