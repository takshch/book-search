import axios from 'axios';

const API = process.env.REACT_APP_API;
const SignInAPI = `${API}/session/login`;

export const handleSignInWithGoogle = async ({ credential }) => {
  const { status } = await axios.post(SignInAPI, { credential }, {
    withCredentials: true
  });
  console.log(status);
};
