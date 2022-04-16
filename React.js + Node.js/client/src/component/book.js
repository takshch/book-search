import React from 'react';
import RatingStars from './rating-stars';
import './book.scss';

function Book(props) {
  const {
    imageLinks,
    title,
    subtitle,
    averageRating,
    publisher,
    publishedDate,
    printType,
    language,
    description
  } = props;

  let { authors } = props;
  authors = authors.join(', ');

  return (
    <div className="book">
      <div className="header">
        <div className="thumbnail">
          <div className="image-wrapper">
            <img src={imageLinks.thumbnail} alt={title} data-test-image />
          </div>
          {averageRating && (
            <div className="rating" data-test-rating>
              <RatingStars stars={averageRating} />
            </div>
          )
          }
        </div>

        <div className="text">
          <div className="title" data-test-title>{title}</div>

          {subtitle &&
            (<div className="subtitle" data-test-subtitle>{subtitle}</div>)
          }

          <div className="authors">
            Authors : <span data-test-authors>{authors}</span>
          </div>

          <div className="publisher">
            Published by : <span data-test-publisher>{publisher}</span>
          </div>

          <div className="published-date">
            Published on : <span data-test-published-date>{publishedDate}</span>
          </div>

          <div className="type">
            Print Type : <span data-test-print-type>{printType}</span>
          </div>

          <div className="language">
            Language : <span data-test-language>{language}</span>
          </div>
        </div>
      </div>
      <div className="body" data-test-description dangerouslySetInnerHTML={{ __html: description }}>
      </div>
    </div>
  );
}

export default Book;