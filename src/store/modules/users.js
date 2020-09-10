import { toast } from 'react-toastify';

import { getAllUsersRequest } from '../../api/users';

const GET_USERS_PROCCESS = 'GET_USERS_PROCCESS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'GET_USERS_ERROR';

export const getUsers = () => async dispatch => {
  try {
    dispatch({ type: GET_USERS_PROCCESS });
    const {
      data: { users },
    } = await getAllUsersRequest();
    dispatch({ type: GET_USERS_SUCCESS, payload: users });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: GET_USERS_ERROR, payload: error.response.data });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  users: [],
};

export const usersReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case GET_USERS_PROCCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case GET_USERS_ERROR:
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
