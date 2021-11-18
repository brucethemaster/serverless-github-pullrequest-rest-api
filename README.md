# serverless-github-pullrequest-rest-api


create project:sls create --template aws-nodejs --path serverless-github-pullrequest-rest-api

deploy project: serverless deploy

unit test cmd: npm test

integration test cmd:serverless test

deployed api for testing purpose:
https://osgza92mj6.execute-api.us-west-1.amazonaws.com/dev/pullrequests/colinhacks/zod/pulls?state=closed
