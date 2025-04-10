const Alert = require('../models/alertModel');
const { findUsers } = require('../models/emergencyContactModel');
const { sendSms } = require('../utils/sendSms');

exports.triggerEmergency = async (req, res) => {
  const { message, location, status } = req.body;
  const { userId } = req.user;

  try {
    const alert = await Alert.create(userId, message, location, status);

    // Fetch emergency contacts
    const contacts = await findUsers();
    console.log('Emergency contacts:', contacts);
    // Send SMS to each contact
    for (const contact of contacts) {
      await sendSms(
        contact.phone_number,
        `🚨 EMERGENCY ALERT: ${message} at (${location.latitude}, ${location.longitude}). Please check on them!`
      );
    }

    res.status(201).json(alert);
  } catch (error) {
    console.error('Error triggering alert or sending SMS:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmergencyStatus = async (req, res) => {
  const { id } = req.params;
  const { message, location, status } = req.body;
  try {
    const alert = await Alert.updateStatus(id, message, location, status);
    if (!alert) { return res.status(404).json({ message: 'Alert not found' }) };
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAlerts = async (req, res) => {
  const { userId } = req.user;
  try {
    const alerts = await Alert.getAllByUserId(userId);
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlertById = async (req, res) => {
  const { id } = req.params;
  try {
    const alert = await Alert.getById(id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAlert = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Alert.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};