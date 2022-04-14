import Component from '@glimmer/component';

export default class BlockRatingStarsComponent extends Component {
  get stars() {
    const { stars } = this.args;
    return parseInt(stars, 10);
  }

  get unfilledStars() {
    const { stars } = this;
    const len = 5 - stars;

    return new Array(len);
  }

  get filledStars() {
    const { stars } = this;
    return new Array(stars);
  }
}
