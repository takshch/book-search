import React, { useEffect, useRef } from 'react';

const client_id = '202796636074-gr2d30kdui3dhamqqck4ahq1lg0q0fds.apps.googleusercontent.com';

const loadButton = (element, callback) => {
  const { google: { accounts: { id } } } = window;

  id.initialize({ client_id, callback });

  id.renderButton(element,
    { theme: "outline", size: "large" }
  );

  id.prompt();
};

function SignInWithGoogle({ callback }) {
  const buttonDiv = useRef(null);

  useEffect(() => {
    const { current: element } = buttonDiv;

    window.addEventListener('load', () => {
      loadButton(element, callback);
    });
  }, []);

  return (
    <div className="sign-in-with-google" ref={buttonDiv}>
    </div>
  );
}

export default SignInWithGoogle;