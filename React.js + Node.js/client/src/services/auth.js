import axios from 'axios';

const API_ORIGIN = process.env.REACT_APP_API;

const API = {
  SignIn: `${API_ORIGIN}/session/login`,
  Authentication: `${API_ORIGIN}/session/authenticate`,
};

export const SignIn = async ({ credential }) => {
  const { status } = await axios.post(API.SignIn, { credential }, {
    withCredentials: true
  });
  return { status };
};

export const isUserAuthenticated = async () => {
  const { status } = await axios.get(API.Authentication, { withCredentials: true });
  return status === 200;
};
