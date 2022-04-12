import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { cached } from 'tracked-toolbox';
import debounce from 'lodash.debounce';
import { action } from '@ember/object';

const API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAP7RLQ19tsrTmOEQvdQtcAbuYOlJrK0ac';

export default class RouteSearchComponent extends Component {
  @tracked value = null;
  @tracked items = [];

  async searchBooks() {
    const { value } = this;
    const url = `${API}?q=${value}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { items } = data;
      this.items = items;
    } catch (e) {
      this.error = e;
    }
  }

  @cached
  get debouncedSearchBooks() {
    return debounce(this.searchBooks, 200);
  }

  @action
  async onInput(e) {
    const { value } = e.target;
    this.value = value;
    this.debouncedSearchBooks();
  }
}
