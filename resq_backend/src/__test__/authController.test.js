const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seed/seed');

beforeAll(() => {
  return seed();
});
afterAll(() => {
  return db.end();
});

describe('Auth test', () => {

  describe('/auth/signup', () => {
    it('POST - should create a new user', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({ email: "testemail", password: "testpassword" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: "testemail"
        }),
      );
    });

    it('POST - should return 400 if email or password is missing', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({ password: "testpassword" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Email and Password is required"
        }),
      );
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: "testemail", password: "testpassword" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          email: "testemail",
          token: expect.any(String)
        }),
      );
    })
  });

  it('should return 401 if user does not exist', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: "testemail002", password: "testpassword" });
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Invalid credentials"
      }),
    );
  });
})