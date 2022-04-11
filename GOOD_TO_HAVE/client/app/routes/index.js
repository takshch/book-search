import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { route } from 'zuglet/decorators';

@route()
export default class IndexRoute extends Route {
  @service store;
  @service router;

  beforeModel() {
    const { user } = this.store.auth;
    if (user) {
      this.router.transitionTo('/search');
    }
  }
}
