import Model from './model';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cached } from 'tracked-toolbox';
import { inject as service } from '@ember/service';
import debounce from 'lodash.debounce';
import BooksSerializer from '../serializers/books';
import { reads } from 'macro-decorators';

const API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAP7RLQ19tsrTmOEQvdQtcAbuYOlJrK0ac';

const { assign } = Object;

export default class BookSearchModel extends Model {
  @service store;
  @reads('store.auth.user.uid') uid;

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

    if (!this.isError) {
      this.updateSearchesOnBackend();
    }
  }

  async updateSearchesOnBackend() {
    const { uid } = this;
    if (!uid) return;

    const { FieldValue } = this.store.firebase.firebase.firestore;
    const data = {
      searches: FieldValue.arrayUnion(this.searchValue),
    };

    try {
      const ref = this.store.doc(`users/${uid}/additional/searches`);
      await ref.save(data, { merge: true });
    } catch (e) {
      console.log('not able to push new searches');
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
