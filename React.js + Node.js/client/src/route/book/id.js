import React from 'react';
import './id.scss';
import { useParams } from 'react-router-dom';

function RouteBookId() {
  const { id } = useParams();

  return (
    <div className="route-book-id">
      Book id: {id}
    </div>
  );
}

export default RouteBookId;