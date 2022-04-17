const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { ddbClient } = require('./ddb-client');

const marshallOptions = {};
const unmarshallOptions = {};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

module.exports = { ddbDocClient };
