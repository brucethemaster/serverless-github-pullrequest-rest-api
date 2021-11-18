import axios from 'axios';

export const healthCheck = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'ok' }),
    isBase64Encoded: false,
  };
};
export const getPullRequest = async (event, context) => {
  const baseUrl = 'https://api.github.com/repos/';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  const user = event?.pathParameters?.user;
  const repository = event?.pathParameters?.repository;
  const queryParameters = event?.queryStringParameters;

  let url = baseUrl + user + '/' + repository + '/pulls';
  const queryString = Object.entries(queryParameters)
    .map(entry => entry.join('='))
    .join('&');
  if (queryString) {
    url += `?${queryString}`;
  }

  const res = await axios.get(url);
  let data = res.data;

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    isBase64Encoded: false,
    headers,
  };
};
