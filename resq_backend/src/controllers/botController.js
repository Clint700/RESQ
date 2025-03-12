const openAIService = require('../services/openAIService');

exports.getFirstAidGuidance = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("Received Query:", query);

    const guidance = await openAIService.getCompletion(query);
    console.log("AI Response:", guidance);

    res.status(200).json(guidance);
  } catch (error) {
    console.error("Bot API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};