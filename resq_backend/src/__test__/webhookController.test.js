const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');

afterAll(() => db.end());

describe('/webhooks/sms-status', () => {
  it('POST - should log Twilio delivery webhook payload', async () => {
    const mockPayload = {
      MessageSid: 'SM1234567890abcdef',
      To: '+1234567890',
      From: '+1987654321',
      MessageStatus: 'delivered',
      ErrorCode: null,
      ErrorMessage: null
    };

    const res = await request(app)
      .post('/webhooks/sms-status')
      .send(mockPayload)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Webhook received');
  });

  it('POST - should accept failed message statuses', async () => {
    const mockPayload = {
      MessageSid: 'SM0987654321fedcba',
      To: '+1234567890',
      From: '+1987654321',
      MessageStatus: 'failed',
      ErrorCode: 30008,
      ErrorMessage: 'Unknown destination handset'
    };

    const res = await request(app)
      .post('/webhooks/sms-status')
      .send(mockPayload)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Webhook received');
  });
});