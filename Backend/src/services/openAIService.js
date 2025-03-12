const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint

exports.getCompletion = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // Use latest model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract response correctly
    const aiResponse = response.data.choices[0].message.content.trim();
    console.log("AI Response:", aiResponse);
    return { response: aiResponse };
  } catch (error) {
    console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch AI response");
  }
};