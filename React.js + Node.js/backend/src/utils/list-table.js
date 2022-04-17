const { ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const { ddbClient } = require('./ddb-client');

const listTables = async () => {
  const data = await ddbClient.send(new ListTablesCommand({}));
  return data;
};

module.exports = { listTables };
