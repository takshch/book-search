import React from 'react';
import { Icon } from '@iconify/react';
import './rating-stars.scss';

function RatingStars({ stars }) {
  // removes fraction from number of stars
  // as we don't support dynamic filled stars
  const noOfStars = Math.floor(stars);

  const filledStars = Array(noOfStars).fill(1);
  const unfilledStars = Array(5 - noOfStars).fill(1);

  return (<div className="rating-stars">
    {
      filledStars.map((_, index) =>
        <Icon icon="clarity:star-solid" key={index} className="star" data-test-filled-star />
      )
    }

    {
      unfilledStars.map((_, index) =>
        <Icon icon="clarity:star-line" key={index} className="star" data-test-unfilled-star />
      )
    }
  </div>);
}

export default RatingStars;