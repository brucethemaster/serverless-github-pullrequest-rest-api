import * as handler from '../handler';
import axios from 'axios';

jest.mock('axios');

const event = {
  pathParameters: {
    user: 'testUser',
    repository: 'testRepository',
  },
  queryStringParameters: {
    state: 'testState',
  },
};
const context = 'context';

describe('healthCheck', () => {
  it('should return ok', async () => {
    const callback = (error, response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe('string');
    };

    await handler.healthCheck(event, context);
  });
});

describe('getPullRequest', () => {
  it('get pull request successfully', async () => {
    const data = { data: 'data' };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(handler.getPullRequest(event, context)).resolves.toEqual({
      body: JSON.stringify(data.data),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      isBase64Encoded: false,
      statusCode: 200,
    });
  });

  it('get pul request erroneously', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(handler.getPullRequest(event, context)).rejects.toThrow(errorMessage);
  });
});
