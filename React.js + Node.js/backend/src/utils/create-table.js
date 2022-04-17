const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const { ddbClient } = require('./ddb-client');

const createTable = async (params) => {
  const data = await ddbClient.send(new CreateTableCommand(params));
  return data;
};

module.exports = { createTable };
