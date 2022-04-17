const { updateItem } = require('../utils/update-item');

const getPARAMS = (email, searchKeyword) => ({
  TableName: 'Book_Search',
  UpdateExpression: 'SET Email = if_not_exists(Email, :e), Searches = list_append(Searches, :val)',
  ExpressionAttributeValues: {
    ':e': email,
    ':val': { L: [{ S: searchKeyword }] },
  },
  key: {
    Email: { S: email }
  },
});

const save = async (email, searchKeyword) => {
  const params = getPARAMS(email, searchKeyword);
  return params;
};

module.exports = { save };
