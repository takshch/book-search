import React, { useEffect } from 'react';
import './index.scss';
import SignInWithGoogle from '../component/sign-in-with-google';
import { SignIn } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from '../hooks/use-is-authenticated';

const handleSignInWithGoogle = (setIsAuthenticated) => async ({ credential }) => {
  // login at backend and sets cookie
  const { status } = await SignIn({ credential });
  if (status === 200) {
    setIsAuthenticated(true);
  };
};

function RouteIndex() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/search');
    }
  }, [isAuthenticated]);

  return (
    <div className="route-index">
      {isAuthenticated === false &&
        <SignInWithGoogle callback={handleSignInWithGoogle(setIsAuthenticated)} />
      }
    </div>
  );
}

export default RouteIndex;