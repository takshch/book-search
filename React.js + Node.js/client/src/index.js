import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import RouteIndex from './route';
import RouteSearch from './route/search';
import RouteBookId from './route/book/id';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteIndex />} />
        <Route path="/search" element={<RouteSearch />} />
        <Route path="/book" element={<Navigate to="/search" />} />
        <Route path="/book/:id" element={<RouteBookId />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
