import React from 'react';
import './index.scss';
import BookCard from '../component/book-card';

function RouteIndex() {
  return (
    <div className="route-index">
      <BookCard
        src="http://books.google.com/books/content?id=k1EMAAAAYAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE700ZEWiGVpaj4mcytIba6U4KEhDjkCxN-XIVaZlp6xOKoSm-dTw7PPf-jYkZhK-3Q2OPbboHpVCbuyJL19AmzEN8s7XdfGIgvWXkU5HR1XLwiOsok1g_SNtAjjAlHIw4PFDvQSM&source=gbs_api"
        title="Bonjour, Hello"
        publisher="Southwest Educational Development Laboratory"
        stars={3.5}
      />
    </div>
  );
}

export default RouteIndex;