import { toast } from 'react-toastify';

import { getAllOrdersRequest, getUserOrdersRequest } from '../../api/orders';

const REQUEST_PROCCESS = 'REQUEST_PROCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';
const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
const GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS';

export const getOrders = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { orders },
    } = await getAllOrdersRequest();
    dispatch({ type: GET_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: REQUEST_ERROR, payload: error.response.data });
  }
};

export const getUserOrders = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { orders },
    } = await getUserOrdersRequest();
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: REQUEST_ERROR, payload: error.response.data });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  orders: [],
  userOrders: [],
};

export const ordersReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_PROCCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
      };
    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        userOrders: payload,
      };
    case REQUEST_ERROR:
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
