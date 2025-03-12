const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: '+1234567890', // Your Twilio phone number
      to,
    });
    return message;
  } catch (error) {
    throw new Error('Error sending SMS with Twilio');
  }
};
