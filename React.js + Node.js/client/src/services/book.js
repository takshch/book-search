import * as BooksSerializer from '../serializers/books';
import * as BookSerializer from '../serializers/book';
import axios from 'axios';

const API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAP7RLQ19tsrTmOEQvdQtcAbuYOlJrK0ac';

export const search = async (searchKeyword) => {
  if (!searchKeyword) return;

  const url = `${API}?q=${searchKeyword}&key=${API_KEY}`;
  const response = await axios.get(url);
  const { data } = response;

  return BooksSerializer.normalizeResponse(data);
};

export const saveSearch = async (search) => {
  if (!search) return;

  const url = `${process.env.REACT_APP_API}/book/search/save`;
  const response = await axios.post(url,
    { search },
    { withCredentials: true }
  );

  return response;
};

export const loadById = async (id) => {
  if (!id) return;

  const url = `${API}/${id}`;
  const response = await axios.get(url);
  const { data } = response;

  return BookSerializer.normalizeResponse(data);
};
