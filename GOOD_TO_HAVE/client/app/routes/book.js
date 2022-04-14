import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookRoute extends Route {
  @service router;

  beforeModel(transition) {
    const { id } = transition.to.params;
    if (!id) {
      this.router.transitionTo('index');
    }
  }
}
