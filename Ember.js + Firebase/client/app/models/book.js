import Model from './model';
import { tracked } from '@glimmer/tracking';
import BookSerializer from '../serializers/book';

const API = (id) => `https://www.googleapis.com/books/v1/volumes/${id}`;

const { assign } = Object;

export default class BookModel extends Model {
  @tracked isBusy = false;
  @tracked isError = false;
  @tracked null = null;

  @tracked data = null;

  constructor(owner, { id }) {
    super(owner);
    this.id = id;
  }

  async fetchBook() {
    if (!this.id) return;

    const url = API(this.id);

    assign(this, { isBusy: true, error: null, isError: false });

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { error } = data;
      if (error) {
        assign(this, { isError: true, error: error.message });
      } else {
        const serializer = new BookSerializer();
        this.data = serializer.normalizeResponse(data);
      }
    } catch (e) {
      assign(this, { isError: true, error: e });
    } finally {
      assign(this, { isBusy: false });
    }
  }

  async load() {
    await this.fetchBook();
  }
}
