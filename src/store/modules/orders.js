import { toast } from 'react-toastify';

import { getAllOrdersRequest } from '../../api/orders';

const GET_ORDERS_PROCCESS = 'GET_ORDERS_PROCCESS';
const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';

export const getOrders = () => async dispatch => {
  try {
    dispatch({ type: GET_ORDERS_PROCCESS });
    const {
      data: { orders },
    } = await getAllOrdersRequest();
    dispatch({ type: GET_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: GET_ORDERS_ERROR, payload: error.response.data });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  orders: [],
};

export const ordersReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case GET_ORDERS_PROCCESS:
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
    case GET_ORDERS_ERROR:
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
