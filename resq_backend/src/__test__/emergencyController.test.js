// const { triggerEmergency, updateEmergencyStatus } = require('../controllers/emergencyController');
// const Alert = require('../models/alertModel');

// jest.mock('../models/alertModel');

// describe('Emergency Controller', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should trigger an emergency alert', async () => {
//     const req = { body: { userId: 1, location: '123 Main St' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     const mockAlert = { id: 1, userId: 1, location: '123 Main St', status: 'active' };

//     Alert.create.mockResolvedValue(mockAlert);

//     await triggerEmergency(req, res);

//     expect(Alert.create).toHaveBeenCalledWith(1, '123 Main St', 'active');
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(mockAlert);
//   });

//   it('should update the status of an emergency alert', async () => {
//     const req = { params: { alertId: 1 }, body: { status: 'resolved' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     const mockAlert = { id: 1, userId: 1, location: '123 Main St', status: 'resolved' };

//     Alert.updateStatus.mockResolvedValue(mockAlert);

//     await updateEmergencyStatus(req, res);

//     expect(Alert.updateStatus).toHaveBeenCalledWith(1, 'resolved');
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockAlert);
//   });
// });
