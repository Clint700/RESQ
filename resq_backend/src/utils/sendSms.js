const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSms = async (to, body) => {
  // ✅ Skip sending real SMS during test runs
  if (process.env.NODE_ENV === 'test') {
    console.log(`[Mock SMS] To: ${to} | Body: ${body}`);
    return 'Mock SMS sent';
  }

  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
      body,
    });
    return message;
  } catch (error) {
    console.error('❌ SMS error:', error?.message || error);
    throw new Error('Failed to send SMS');
  }
};