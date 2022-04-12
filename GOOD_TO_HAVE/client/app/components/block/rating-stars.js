import Component from '@glimmer/component';

export default class BlockRatingStarsComponent extends Component {
  get unfilledStars() {
    const { stars } = this.args;
    const len = 5 - stars;

    return new Array(len);
  }

  get filledStars() {
    const { stars } = this.args;
    return new Array(stars);
  }
}
