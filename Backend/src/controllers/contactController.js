const EmergencyContact = require('../models/emergencyContactModel');

exports.addContact = async (req, res) => {
  const { userId, name, phoneNumber } = req.body;
  try {
    const contact = await EmergencyContact.create(userId, name, phoneNumber);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  const { userId } = req.params;
  try {
    const contacts = await EmergencyContact.findByUserId(userId);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
