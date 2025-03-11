const { getFirstAidGuidance } = require('../controllers/botController');
const openAIService = require('../services/openAIService');

jest.mock('../services/openAIService');

describe('Bot Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get first aid guidance from the AI chatbot', async () => {
    const req = { body: { query: 'How to treat a burn?' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockGuidance = { response: 'Apply cool water to the affected area.' };

    openAIService.getCompletion.mockResolvedValue(mockGuidance);

    await getFirstAidGuidance(req, res);

    expect(openAIService.getCompletion).toHaveBeenCalledWith('How to treat a burn?');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGuidance);
  });

  it('should return an error if the AI chatbot fails', async () => {
    const req = { body: { query: 'How to treat a burn?' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    openAIService.getCompletion.mockRejectedValue(new Error('AI service error'));

    await getFirstAidGuidance(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'AI service error' });
  });
});
