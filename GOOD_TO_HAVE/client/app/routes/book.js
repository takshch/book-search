import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookRoute extends Route {
  @service store;
  @service router;

  async model({ id }) {
    if (!id) {
      this.router.transitionTo('index');
    }

    const model = await this.store.models.create('book', { id });
    model.load();

    return model;
  }
}
