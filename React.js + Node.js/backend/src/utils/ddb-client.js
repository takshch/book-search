const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const config = require('config');

const { assign } = Object;

// Set the AWS Configuration.
const { region, credentials } = config.get('dynamoDb');

let dbConfig = {
  region,
  credentials
};

if (process.env.NODE_ENV !== 'production') {
  assign(dbConfig, { endpoint: 'http://localhost:8000' });
}

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient(dbConfig);

module.exports = { ddbClient };
