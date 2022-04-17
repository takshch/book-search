const BookService = require('../services/book');

// saves Search of user
const save = async (req, res) => {
  const { email } = req.user;
  const { search } = req.body;

  try {
    const { Item } = await BookService.read(email, search);

    if (!Item) {
      await BookService.add(email, search);
    } else {
      const { Searches } = Item;

      // Adds search keyword when it is not present in Searches
      if (Searches && !Searches.includes(search)) {
        await BookService.save(email, search);
      }
    }

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.boom.badImplementation();
  }
};

module.exports = { save };