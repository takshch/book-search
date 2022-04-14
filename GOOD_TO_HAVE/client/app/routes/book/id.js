import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookIdRoute extends Route {
  @service store;
  @service router;

  model({ id }) {
    const model = this.store.models.create('book', { id });
    model.load();

    return model;
  }
}
