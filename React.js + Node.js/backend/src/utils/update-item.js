const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('./ddb-doc-client');

const updateItem = async (params) => {
  const data = await ddbDocClient.send(new UpdateCommand(params));
  return data;
};

module.exports = { updateItem };
