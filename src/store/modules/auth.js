import { toast } from 'react-toastify';

import { authenticationRequest, registrationRequest } from '../../api/auth';

import {
  setToken,
  // encodeUserObject
} from '../../api/helpers';

const REGISTRATION_PROCCESS = 'REGISTRATION_PROCCESS';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
const AUTHENTICATION_PROCCESS = 'AUTHENTICATION_PROCCESS';
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const register = (user, history, redirectUrl) => async dispatch => {
  try {
    dispatch({ type: REGISTRATION_PROCCESS });
    const {
      data: { token },
    } = await registrationRequest(user);
    setToken(token);
    dispatch({
      type: REGISTRATION_SUCCESS,
    });
    toast.success('Account successfully created');
    history.push(redirectUrl);
  } catch (error) {
    toast.error(`${error.response.data[0].message}`);
    dispatch({ type: REGISTRATION_ERROR, payload: error.response.data });
  }
};

export const authenticate = (user, history, redirectUrl) => async dispatch => {
  try {
    dispatch({ type: AUTHENTICATION_PROCCESS });
    const {
      data: { token },
    } = await authenticationRequest(user);
    setToken(token);
    dispatch({
      type: AUTHENTICATION_SUCCESS,
    });
    toast.success('You have been logged in successfully');
    history.push(redirectUrl);
  } catch (error) {
    toast.error(`${error.response.data[0].message}`);
    dispatch({ type: AUTHENTICATION_ERROR, payload: error.response.data });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  status: undefined,
};

export const authReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case REGISTRATION_PROCCESS:
    case AUTHENTICATION_PROCCESS:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTRATION_SUCCESS:
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: 'success',
      };
    case REGISTRATION_ERROR:
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        isLoading: false,
        status: 'error',
        error: payload,
      };
    default:
      return state;
  }
};
