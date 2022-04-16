import React from 'react';
import './index.scss';
import SignInWithGoogle from '../component/sign-in-with-google';
import * as AuthService from '../services/auth';

function RouteIndex() {
  return (
    <div className="route-index">
      <SignInWithGoogle callback={AuthService.handleSignInWithGoogle}/>
    </div>
  );
}

export default RouteIndex;