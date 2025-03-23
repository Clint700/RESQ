const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');

// describe('Auth Controller Integration', () => {
//   afterAll(() => {
//     return db.end();
//   });

//   describe.only('POST /auth/signup', () => {
//     it('should create a new user and return user data', async () => {
//       const response = await request(app)
//         .post('/auth/signup')
//         .send({
//           email: 'testuser@example.com',
//           password: 'securepassword123'
//         });

//       expect(response.statusCode).toBe(201);
//       expect(response.body).toHaveProperty('id');
//       expect(response.body.email).toBe('testuser@example.com');
//     });
//   });

//   describe('POST /auth/login', () => {
//     it('should login an existing user and return a token', async () => {
//       // First, make sure the user exists
//       await request(app)
//         .post('/auth/signup')
//         .send({
//           email: 'testlogin@example.com',
//           password: 'mypassword'
//         });

//       const response = await request(app)
//         .post('/auth/login')
//         .send({
//           email: 'testlogin@example.com',
//           password: 'mypassword'
//         });

//       expect(response.statusCode).toBe(200);
//       expect(response.body).toHaveProperty('token');
//       expect(typeof response.body.token).toBe('string');
//     });
//   });
// });