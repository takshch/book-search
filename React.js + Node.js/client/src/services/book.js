import * as BooksSerializer from '../serializers/books';
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
