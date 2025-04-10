const db = require('../db/connection');

exports.smsStatusHandler = async (req, res) => {
  try {
    const {
      MessageSid,
      MessageStatus,
      To,
      ErrorCode,
      ErrorMessage,
    } = req.body;

    
    console.log('📩 SMS Webhook received:', {
      MessageSid,
      MessageStatus,
      To,
      ErrorCode,
      ErrorMessage,
    });

    // You can save/update log status in DB here if needed

    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('❌ Webhook error:', err.message || err);
    res.status(500).send('Webhook processing failed');
  }
};