import { http } from './client';

export const registrationRequest = async credentials =>
  await http.post('/users/register', credentials);
export const authenticationRequest = async credentials =>
  await http.post('/users/authenticate', credentials);
