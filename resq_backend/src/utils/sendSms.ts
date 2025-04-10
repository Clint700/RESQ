import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export const sendSms = async (to: string, body: string) => {
  try {
    const message = await client.messages.create({
      body,
      from: twilioNumber,
      to,
    });

    console.log('✅ SMS sent to:', to);
    return message;
  } catch (error: any) {
    console.error('❌ SMS error:', error?.message || error);
    throw new Error('Failed to send SMS');
  }
};