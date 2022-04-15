import React from 'react';
import './book-card.scss';
import RatingStars from './rating-stars';

function BookCard({ src, title, publisher, stars }) {
  return (
    <div className="book-card">
      <div className="header">
        <div className="image-block">
          <img src={src} alt={title} data-test-image />
        </div>
      </div>

      <div className="body">
        <div className="title" data-test-title>{title}</div>
        <div className="publisher" data-test-publisher>{publisher}</div>

        {stars && (
          <div className="rating" data-test-rating>
            <RatingStars stars={stars} />
          </div>
        )}

      </div>
    </div>
  );
}

export default BookCard;