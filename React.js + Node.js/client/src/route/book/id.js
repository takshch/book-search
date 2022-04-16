import React, { useState, useEffect } from 'react';
import './id.scss';
import { useParams } from 'react-router-dom';
import Book from '../../component/book';
import * as BookService from '../../services/book';

const loadBook = async (id, setBook) => {
  try {
    const data = await BookService.loadById(id);
    setBook(data);
  } catch (e) {
    console.log(e);
  }
};

function RouteBookId() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBook(id, setBook);
  }, []);

  return (
    <div className="route-book-id">
      <div className="book">
        {book && <Book {...book} />}
      </div>
    </div>
  );
}

export default RouteBookId;