const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { ddbClient } = require('./ddb-client');

const updateItem = async (params) => {
  const data = await ddbClient.send(new UpdateItemCommand(params));
  return data;
};

module.exports = { updateItem };
