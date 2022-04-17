const { GetCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('./ddb-doc-client');

const getItem = async (params) => {
  const data = await ddbDocClient.send(new GetCommand(params));
  return data;
};

module.exports = { getItem };
