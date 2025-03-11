const { signup, login } = require('../controllers/authController');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'testuser', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    User.create.mockResolvedValue({ id: 1, username: 'testuser' });

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, username: 'testuser' });
  });

  it('should log in a user', async () => {
    const req = { body: { username: 'testuser', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    User.findByUsername.mockResolvedValue({ id: 1, username: 'testuser', password: await bcrypt.hash('password123', 10) });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockedtoken');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'mockedtoken' });
  });
});
