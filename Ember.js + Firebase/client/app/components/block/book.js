import Component from '@glimmer/component';
import { reads } from 'macro-decorators';

export default class BlockBookComponent extends Component {
  @reads('args.book') book;

  get authors() {
    const authors = this.book?.authors;
    if (!authors) return null;

    return authors.reduce((prev, curr, index) => {
      let authorText = `${prev}`;
      if (index !== authors.length) {
        authorText = authorText + ', ';
      }
      authorText = authorText + curr;
      return authorText;
    });
  }
}
