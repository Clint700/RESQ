const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions'; 

exports.getCompletion = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000, 
        temperature: 0.7, 
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    console.log("AI Response:", aiResponse);
    return { response: aiResponse };
  } catch (error) {
    console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch AI response");
  }
};