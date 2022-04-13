import Model from './model';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cached } from 'tracked-toolbox';
import debounce from 'lodash.debounce';
import BooksSerializer from '../serializers/books';

const API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAP7RLQ19tsrTmOEQvdQtcAbuYOlJrK0ac';

const { assign } = Object;

export default class BookSearchModel extends Model {
  @tracked isBusy = false;
  @tracked isError = false;
  @tracked error = null;

  @tracked books = [];
  @tracked searchValue = null;

  get url() {
    const { searchValue } = this;
    if (!searchValue) return null;

    return `${API}?q=${searchValue}&key=${API_KEY}`;
  }

  async searchBooks() {
    const { url } = this;
    if (!url) return;

    assign(this, { isBusy: true, error: null, isError: false });

    try {
      const response = await fetch(url);
      const data = await response.json();

      const serializer = new BooksSerializer();
      this.books = serializer.normalizeResponse(data);
    } catch (e) {
      assign(this, { isError: true, error: e });
    } finally {
      assign(this, { isBusy: false });
    }
  }

  @cached
  get scheduleSearchBooks() {
    return debounce(this.searchBooks, 1000);
  }

  @action
  setSearchValue(searchValue) {
    this.searchValue = searchValue;
    this.scheduleSearchBooks();
  }
}
