import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from '../hooks/use-is-authenticated';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated] = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;