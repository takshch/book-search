const { createTable } = require('./utils/create-table');
const { listTables } = require('./utils/list-tables');
const { Schema: BOOK_SEARCH_SCHEMA } = require('./schema/create-book-table');

listTables().then(res => {
  const doesBookSearchTableExists = res.TableNames.includes('BOOK_SEARCH');
  if (!doesBookSearchTableExists) {
    console.log('Created table');
    createTable(BOOK_SEARCH_SCHEMA);
  }
});
