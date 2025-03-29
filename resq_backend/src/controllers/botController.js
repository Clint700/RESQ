const openAIService = require('../services/openAIService');

exports.getFirstAidGuidance = async (req, res) => {
  try {
    const { query } = req.body;

    const guidance = await openAIService.getCompletion(query);

    res.status(200).json(guidance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};