const EmergencyContact = require('../models/emergencyContactModel');

exports.addContact = async (req, res) => {
  const { email, name, phone_number } = req.body;
  if (!email || !name || !phone_number) {
    return res.status(400).json({ message: 'Name, Email and Phone number is required' });
  };
  try {
    const contact = await EmergencyContact.create(email, name, phone_number);
    if (contact.status === 402) {
      return res.status(402).json({ message: 'Name, Email and Phone number already exist' });
    }
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.findUsers();
    res.status(200).json(contacts);
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

exports.patchContacts = async (req, res) => {
  const { userId } = req.params;
  const { email, name, phone_number } = req.body;
  try {
    const contact = await EmergencyContact.patchUserById(userId, email, name, phone_number);
    if (contact === null) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContacts = async (req, res) => {
  const { userId } = req.params;
  try {
    const contact = await EmergencyContact.deleteUserById(userId);
    if (contact === null) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).json({ message: 'Contact deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};