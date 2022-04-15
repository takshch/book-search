import BookSerializer from "./book";

export const normalizeResponse = (data) => {
  const { items } = data;

  const books = items.map((item) => BookSerializer.normalizeResponse(item));
  return books;
};
