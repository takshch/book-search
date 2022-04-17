const { createTable } = require('./src/utils/create-table');
const { listTables } = require('./src/utils/list-tables');
const { Schema: BOOK_SEARCH_SCHEMA } = require('./src/schema/create-book-table');

listTables().then(res => {
  const doesBookSearchTableExists = res.TableNames.includes('BOOK_SEARCH');
  if (!doesBookSearchTableExists) {
    console.log('Created table');
    createTable(BOOK_SEARCH_SCHEMA);
  }
});
