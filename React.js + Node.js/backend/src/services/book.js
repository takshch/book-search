const { updateItem } = require('../utils/update-item');
const { getItem } = require('../utils/get-item');
const { putItem } = require('../utils/put-item');

const read = async (email) => {
  const params = {
    TableName: 'BOOK_SEARCH',
    Key: {
      Email: email
    },
  };

  const data = await getItem(params);
  return data;
};


const add = async (email, searchKeyword) => {
  const params = {
    TableName: 'BOOK_SEARCH',
    Item: {
      Email: email,
      Searches: [searchKeyword]
    }
  };

  const data = await putItem(params);
  return data;
};

const save = async (email, searchKeyword) => {
  const params = {
    TableName: 'BOOK_SEARCH',
    UpdateExpression: 'SET #s = list_append(#s, :val)',
    ExpressionAttributeNames: {
      '#s': 'Searches'
    },
    ExpressionAttributeValues: {
      ':val': [searchKeyword],
    },
    Key: {
      Email: email
    },
    ReturnValues: 'UPDATED_NEW',
  };

  const data = await updateItem(params);
  return data;
};

module.exports = { read, add, save };
