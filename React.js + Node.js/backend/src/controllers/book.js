const BookService = require('../services/book');

const save = async (req, res) => {
  res.status(201).send(BookService.save("takshchanana@gmail.com", 'harry'));
};

module.exports = { save };