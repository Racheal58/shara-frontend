import { combineReducers } from 'redux';

// reducers
import { authReducer } from './modules/auth';
import { productsReducer } from './modules/products';
import { usersReducer } from './modules/users';
import { ordersReducer } from './modules/orders';

export default combineReducers({
  auth: authReducer,
  product: productsReducer,
  user: usersReducer,
  order: ordersReducer,
});
