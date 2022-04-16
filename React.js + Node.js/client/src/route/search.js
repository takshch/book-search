import React, { useState, useEffect } from 'react';
import './search.scss';
import SearchBar from '../component/searchbar';
import debounce from 'lodash.debounce';
import * as BookService from '../services/book';
import { Link } from 'react-router-dom';
import BookCard from '../component/book-card';

const onInput = (setSearchValue) => (e) => {
  const value = e.target.value;
  setSearchValue(value);
};

const searchBook = debounce(async (searchValue, setBooks) => {
  try {
    const books = await BookService.search(searchValue);
    setBooks(books);
  } catch (e) {
    console.log(e);
  }
}, 1000);

function RouteSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (searchValue) {
      searchBook(searchValue, setBooks);
    };
  }, [searchValue]);


  return (
    <div className="route-search">
      <SearchBar placeholder="Harry Potter" onInput={onInput(setSearchValue)} />

      <div className="cards">
        {books.map((book, index) => (
          <Link key={index} to={`/book/${book.id}`} className="card-wrapper">
            <BookCard
              src={book.imageLinks.smallThumbnail}
              title={book.title}
              publisher={book.publisher}
              stars={book.averageRating}
            />
          </Link>)
        )}
      </div>
    </div>
  );
}

export default RouteSearch;