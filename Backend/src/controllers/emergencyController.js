const Alert = require('../models/alertModel');

exports.triggerEmergency = async (req, res) => {
  const { userId, location } = req.body;
  try {
    const alert = await Alert.create(userId, location, 'active');
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmergencyStatus = async (req, res) => {
  const { alertId } = req.params;
  const { status } = req.body;
  try {
    const alert = await Alert.updateStatus(alertId, status);
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
