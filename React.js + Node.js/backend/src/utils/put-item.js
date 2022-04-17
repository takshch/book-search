const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('./ddb-doc-client');

const putItem = async (params) => {
  const data = await ddbDocClient.send(new PutCommand(params));
  return data;
};

module.exports = { putItem };
