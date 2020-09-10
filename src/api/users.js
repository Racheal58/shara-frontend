import { http } from './client';

export const getAllUsersRequest = async () => await http.get('/users');
