import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RouteSearchComponent extends Component {
  @action
  async onInput(e) {
    const { value } = e.target;
    this.args.model.setSearchValue(value);
  }
}
