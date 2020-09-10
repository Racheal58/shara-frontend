import { http } from './client';

export const getAllOrdersRequest = async () => await http.get('/orders');
