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
  try {
    const res = await axios.get(url);
    let data = res.data;

    if (data && typeof expenses !== 'object') {
      const pullRequest = await Promise.all(
        data.map(async item => {
          try {
            let pullRequestId = item.url.slice(item.url.lastIndexOf('/') + 1);
            let commitsUrl = baseUrl + user + '/' + repository + '/pulls/' + pullRequestId + '/commits';

            let res = await axios.get(commitsUrl);
            let commits = res?.data?.length || 0;

            return { pull_request: item.url, number_commits: commits };
          } catch (err) {}
        })
      );
      return {
        statusCode: 200,
        body: JSON.stringify(pullRequest),
        isBase64Encoded: false,
        headers,
      };
    }
  } catch (err) {
    throw new Error(err);
  }
};
