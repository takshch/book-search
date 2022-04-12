import Route from '@ember/routing/route';

export default class BookRoute extends Route {
  model({ id }) {
    console.log(id);
  }
}
