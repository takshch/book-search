// Set the parameters
const Schema = {
  AttributeDefinitions: [
    {
      AttributeName: "Email",
      AttributeType: "S",
    }
  ],
  KeySchema: [
    {
      AttributeName: "Email",
      KeyType: "HASH",
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: "BOOK_SEARCH",
  StreamSpecification: {
    StreamEnabled: false,
  },
};

module.exports = { Schema };
