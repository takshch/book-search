import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import RouteIndex from './route';
import RouteSearch from './route/search';
import RouteBookId from './route/book/id';
import PrivateRoute from './component/private-route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<RouteIndex />} />
          <Route
            path="search"
            element={
              <PrivateRoute>
                <RouteSearch />
              </PrivateRoute>
            }
          />
          <Route  path="book" element={<Navigate to="/search" />} />
          <Route
            path="book/:id"
            element={
              <PrivateRoute>
                <RouteBookId />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
