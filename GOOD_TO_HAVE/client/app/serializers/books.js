import BookSerializer from './book';

export default class BooksSerializer {
  normalizeResponse(data) {
    const { items } = data;

    const serializer = new BookSerializer();
    const books = items.map((item) => serializer.normalizeResponse(item));
    return books;
  }
}
