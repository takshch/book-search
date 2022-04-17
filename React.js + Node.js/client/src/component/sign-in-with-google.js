import React, { useState, useEffect, useRef } from 'react';

const client_id = '202796636074-gr2d30kdui3dhamqqck4ahq1lg0q0fds.apps.googleusercontent.com';

const loadButton = (setIsFailedToLoad) => (element, callback) => {
  if (!window.google) {
    setIsFailedToLoad(true);
  }

  const { google: { accounts: { id } } } = window;

  id.initialize({ client_id, callback });

  id.renderButton(element,
    { theme: "outline", size: "large" }
  );
};

function SignInWithGoogle({ callback }) {
  const buttonDiv = useRef(null);
  const [isFailedToLoad, setIsFailedToLoad] = useState(false);

  useEffect(() => {
    const { current: element } = buttonDiv;
    setTimeout(() => {
      loadButton(setIsFailedToLoad)(element, callback);
    }, 500);
  }, []);

  return (
    <div className="sign-in-with-google">
      <div ref={buttonDiv}></div>
      {
        isFailedToLoad && (<div className="error">Failed to load Google button</div>)
      }
    </div>
  );
}

export default SignInWithGoogle;