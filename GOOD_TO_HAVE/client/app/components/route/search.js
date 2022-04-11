import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RouteSearchComponent extends Component {
  @action
  onInput(e) {
    const { value } = e.target;
    console.log(value);
  }
}
