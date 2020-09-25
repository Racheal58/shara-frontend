import jwt from 'jsonwebtoken';

import { KEY } from '../utils/config';

export const decodeToken = () => jwt.decode(getToken());
export const isAdmin = () => {
  const { data } = decodeToken();

  return data.isAdmin === 'true';
};

export const setToken = async token => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const destroyToken = () => {
  localStorage.removeItem('token');
  return null;
};

export const encodeUserObject = async user =>
  localStorage.setItem(
    'encodedUser',
    jwt.sign(user, KEY, { expiresIn: '3000days' }),
  );

export const decodeUserObject = () =>
  decodeToken(localStorage.getItem('encodedUser'));

export const destroyEncodedUser = () => {
  localStorage.removeItem('encodedUser');
  return null;
};

export const setRedirectUrl = url => localStorage.setItem('redirectUrl', url);
export const removeRedirectUrl = () => localStorage.removeItem('redirectUrl');

export const logout = () => {
  destroyToken();
  destroyEncodedUser();
  removeRedirectUrl();
  window.location.assign('/authenticate');
};
