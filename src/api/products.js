import { http } from './client';

export const getAllProductsRequest = async () => await http.get('/products');

export const createProductRequest = async credentials =>
  await http.post('/products', credentials);

export const deleteProductRequest = async productId =>
  await http.delete(`/products/${productId}`);

export const editProductRequest = async (productId, credentials) =>
  await http.put(`/products/${productId}`, credentials);

export const addProductToOrderRequest = async credentials =>
  await http.post('/orders/addproduct', credentials);

export const getUserOrderRequest = async () =>
  await http.get('/orders?user=true');

export const completeUserOrderRequest = async orderId =>
  await http.post(`/orders/complete/${orderId}`);

export const removeProductFromOrderRequest = async (orderId, productId) =>
  await http.delete(`/orders/${orderId}/removeproduct/${productId}`);

export const editProductQuantityRequest = async (
  orderId,
  productId,
  quantity,
) =>
  await http.put(`/orders/${orderId}/editproduct/${productId}`, { quantity });
