const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { ddbClient } = require('./ddb-client');

const putItem = async (params) => {
  const data = await ddbClient.send(new PutItemCommand(params));
  return data;
};

module.exports = { putItem };
