import { useState, useEffect } from 'react';
import { isUserAuthenticated } from '../services/auth';

const handleAuthentication = async (setIsAuthenticated) => {
  try {
    const value = await isUserAuthenticated();
    setIsAuthenticated(value);
  } catch (e) {
    setIsAuthenticated(false);
  }
};

function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    handleAuthentication(setIsAuthenticated);
  }, []);

  return [isAuthenticated, setIsAuthenticated];
}

export default useIsAuthenticated;
