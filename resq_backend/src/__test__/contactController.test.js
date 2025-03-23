// const { addContact, getContacts } = require('../controllers/contactController');
// const EmergencyContact = require('../models/emergencyContactModel');

// jest.mock('../models/emergencyContactModel');

// describe('Contact Controller', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should add a new emergency contact', async () => {
//     const req = { body: { userId: 1, name: 'John Doe', phoneNumber: '123-456-7890' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     const mockContact = { id: 1, userId: 1, name: 'John Doe', phoneNumber: '123-456-7890' };

//     EmergencyContact.create.mockResolvedValue(mockContact);

//     await addContact(req, res);

//     expect(EmergencyContact.create).toHaveBeenCalledWith(1, 'John Doe', '123-456-7890');
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(mockContact);
//   });

//   it('should get all emergency contacts for a user', async () => {
//     const req = { params: { userId: 1 } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     const mockContacts = [
//       { id: 1, userId: 1, name: 'John Doe', phoneNumber: '123-456-7890' },
//       { id: 2, userId: 1, name: 'Jane Doe', phoneNumber: '987-654-3210' }
//     ];

//     EmergencyContact.findByUserId.mockResolvedValue(mockContacts);

//     await getContacts(req, res);

//     expect(EmergencyContact.findByUserId).toHaveBeenCalledWith(1);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockContacts);
//   });
// });
