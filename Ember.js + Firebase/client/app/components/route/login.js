import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RouteLoginComponent extends Component {
  @service store;
  @service router;

  @action
  async login() {
    const { uid } = await this.store.auth.methods.popup.google.signIn();
    if (uid) {
      this.router.transitionTo('/search');
    }
  }
}
