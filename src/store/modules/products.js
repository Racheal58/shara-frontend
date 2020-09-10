import { toast } from 'react-toastify';

import {
  getAllProductsRequest,
  createProductRequest,
  deleteProductRequest,
  editProductRequest,
  addProductToOrderRequest,
  getUserOrderRequest,
  completeUserOrderRequest,
  removeProductFromOrderRequest,
  editProductQuantityRequest,
} from '../../api/products';

const GET_PRODUCTS_PROCCESS = 'GET_PRODUCTS_PROCCESS';
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
const CREATE_PRODUCTS_PROCCESS = 'CREATE_PRODUCTS_PROCCESS';
const CREATE_PRODUCTS_SUCCESS = 'CREATE_PRODUCTS_SUCCESS';
const CREATE_PRODUCTS_ERROR = 'CREATE_PRODUCTS_ERROR';
const DELETE_PRODUCTS_PROCESS = 'DELETE_PRODUCTS_PROCESS';
const DELETE_PRODUCTS_SUCCESS = 'DELETE_PRODUCTS_SUCCESS';
const DELETE_PRODUCTS_ERROR = 'DELETE_PRODUCTS_ERROR';
const EDIT_PRODUCTS_PROCESS = 'EDIT_PRODUCTS_PROCESS';
const EDIT_PRODUCTS_SUCCESS = 'EDIT_PRODUCTS_SUCCESS';
const EDIT_PRODUCTS_ERROR = 'EDIT_PRODUCTS_ERROR';
const ADD_PRODUCT_TO_ORDER_PROCESS = 'ADD_PRODUCT_TO_ORDER_PROCESS';
const ADD_PRODUCT_TO_ORDER_SUCCESS = 'ADD_PRODUCT_TO_ORDER_SUCCESS';
const ADD_PRODUCT_TO_ORDER_ERROR = 'ADD_PRODUCT_TO_ORDER_ERROR';
const GET_USER_ORDER_PROCESS = 'GET_USER_ORDER_PROCESS';
const GET_USER_ORDER_SUCCESS = 'GET_USER_ORDER_SUCCESS';
const GET_USER_ORDER_ERROR = 'GET_USER_ORDER_ERROR';
const COMPLETE_USER_ORDER_PROCESS = 'COMPLETE_USER_ORDER_PROCESS';
const COMPLETE_USER_ORDER_SUCCESS = 'COMPLETE_USER_ORDER_SUCCESS';
const COMPLETE_USER_ORDER_ERROR = 'COMPLETE_USER_ORDER_ERROR';
const REMOVE_PRODUCT_FROM_ORDER_PROCESS = 'REMOVE_PRODUCT_FROM_ORDER_PROCESS';
const REMOVE_PRODUCT_FROM_ORDER_SUCCESS = 'REMOVE_PRODUCT_FROM_ORDER_SUCCESS';
const REMOVE_PRODUCT_FROM_ORDER_ERROR = 'REMOVE_PRODUCT_FROM_ORDER_ERROR';
const EDIT_PRODUCT_QUANTITY_PROCESS = 'EDIT_PRODUCT_QUANTITY_PROCESS';
const EDIT_PRODUCT_QUANTITY_SUCCESS = 'EDIT_PRODUCT_QUANTITY_SUCCESS';
const EDIT_PRODUCT_QUANTITY_ERROR = 'EDIT_PRODUCT_QUANTITY_ERROR';

export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: GET_PRODUCTS_PROCCESS });
    const {
      data: { products },
    } = await getAllProductsRequest();
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: GET_PRODUCTS_ERROR, payload: error.response.data });
  }
};

export const createProducts = (newProduct, products) => async dispatch => {
  try {
    dispatch({ type: CREATE_PRODUCTS_PROCCESS });
    const {
      data: { product },
    } = await createProductRequest(newProduct);
    products.push(product);
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: products });
    toast.success('Product has been created');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: CREATE_PRODUCTS_ERROR, payload: error.response.data });
  }
};

export const deleteProduct = (productId, products) => async dispatch => {
  try {
    dispatch({ type: DELETE_PRODUCTS_PROCESS });
    await deleteProductRequest(productId);
    const newProducts = products.filter(product => product._id !== productId);
    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: newProducts });
    toast.success('Product has been successfully deleted');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: DELETE_PRODUCTS_ERROR, payload: error.response.data });
  }
};

export const editProduct = (productId, product, products) => async dispatch => {
  try {
    dispatch({ type: EDIT_PRODUCTS_PROCESS });
    const { data } = await editProductRequest(productId, product);
    let productIndex;
    products.find((element, index) => {
      if (element.id === productId) return (productIndex = index);
    });
    products.splice(productIndex, 1, data.product);
    dispatch({ type: EDIT_PRODUCTS_SUCCESS, payload: products });
    toast.success('Product has been successfully edited');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: EDIT_PRODUCTS_ERROR, payload: error.response.data });
  }
};

export const addProductToOrder = product => async dispatch => {
  try {
    dispatch({ type: ADD_PRODUCT_TO_ORDER_PROCESS });
    const {
      data: { order },
    } = await addProductToOrderRequest(product);
    dispatch({ type: ADD_PRODUCT_TO_ORDER_SUCCESS, payload: order });
    toast.success('Product has been successfully added to Cart');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({
      type: ADD_PRODUCT_TO_ORDER_ERROR,
      payload: error.response.data,
    });
  }
};
export const getUserOrder = () => async dispatch => {
  try {
    dispatch({ type: GET_USER_ORDER_PROCESS });
    const {
      data: { order },
    } = await getUserOrderRequest();
    dispatch({ type: GET_USER_ORDER_SUCCESS, payload: order });
  } catch (error) {
    // toast.error(`${error.response.data.message}`);
    dispatch({ type: GET_USER_ORDER_ERROR, payload: error.response.data });
  }
};

export const completeUserOrder = orderId => async dispatch => {
  try {
    dispatch({ type: COMPLETE_USER_ORDER_PROCESS });
    const {
      data: { order },
    } = await completeUserOrderRequest(orderId);
    dispatch({ type: COMPLETE_USER_ORDER_SUCCESS, payload: order });
    toast.success('Your order has been successfully completed');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({ type: COMPLETE_USER_ORDER_ERROR, payload: error.response.data });
  }
};

export const removeProductFromOrder = (
  orderId,
  productId,
) => async dispatch => {
  try {
    dispatch({ type: REMOVE_PRODUCT_FROM_ORDER_PROCESS });
    const {
      data: { order },
    } = await removeProductFromOrderRequest(orderId, productId);
    // const newProducts = products.filter(product => product._id !== productId);
    dispatch({ type: REMOVE_PRODUCT_FROM_ORDER_SUCCESS, payload: order });
    toast.success('Product has been successfully removed from order');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({
      type: REMOVE_PRODUCT_FROM_ORDER_ERROR,
      payload: error.response.data,
    });
  }
};

export const editProductQuantity = (
  orderId,
  productId,
  quantity,
) => async dispatch => {
  try {
    dispatch({ type: EDIT_PRODUCT_QUANTITY_PROCESS });
    const {
      data: { order },
    } = await editProductQuantityRequest(orderId, productId, quantity);
    dispatch({ type: EDIT_PRODUCT_QUANTITY_SUCCESS, payload: order });
    toast.success('Product Quantity has been successfully edited');
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    dispatch({
      type: EDIT_PRODUCT_QUANTITY_ERROR,
      payload: error.response.data,
    });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  products: [],
  order: {},
  userOrder: {},
  cartLength: 0,
};

export const productsReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_PROCCESS:
    case CREATE_PRODUCTS_PROCCESS:
    case DELETE_PRODUCTS_PROCESS:
    case EDIT_PRODUCTS_PROCESS:
    case ADD_PRODUCT_TO_ORDER_PROCESS:
    case GET_USER_ORDER_PROCESS:
    case COMPLETE_USER_ORDER_PROCESS:
    case REMOVE_PRODUCT_FROM_ORDER_PROCESS:
    case EDIT_PRODUCT_QUANTITY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
    case CREATE_PRODUCTS_SUCCESS:
    case DELETE_PRODUCTS_SUCCESS:
    case EDIT_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    case ADD_PRODUCT_TO_ORDER_SUCCESS:
    case COMPLETE_USER_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: payload,
        cartLength: payload.products.length,
      };
    case GET_USER_ORDER_SUCCESS:
    case REMOVE_PRODUCT_FROM_ORDER_SUCCESS:
    case EDIT_PRODUCT_QUANTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userOrder: payload,
        cartLength: payload.products.length,
      };
    case GET_PRODUCTS_ERROR:
    case CREATE_PRODUCTS_ERROR:
    case DELETE_PRODUCTS_ERROR:
    case EDIT_PRODUCTS_ERROR:
    case ADD_PRODUCT_TO_ORDER_ERROR:
    case GET_USER_ORDER_ERROR:
    case COMPLETE_USER_ORDER_ERROR:
    case REMOVE_PRODUCT_FROM_ORDER_ERROR:
    case EDIT_PRODUCT_QUANTITY_ERROR:
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
