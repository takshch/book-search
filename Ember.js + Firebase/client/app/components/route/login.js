import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RouteLoginComponent extends Component {
  @service store;
  @service router;

  @action
  async login() {
    const user = await this.store.auth.methods.popup.google.signIn();
    if (user?.uid) {
      this.router.transitionTo('index');
    }
  }
}
