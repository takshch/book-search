import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookRoute extends Route {
  @service store;
  @service router;

  async model({ id }) {
    const model = this.store.models.create('book', { id });
    await model.load();

    console.log(model);

    return model;
  }
}
