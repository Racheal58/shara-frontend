import axios from 'axios';
import { getToken } from './helpers';

let Authorization;
if (getToken()) {
  Authorization = { Authorization: `Bearer ${getToken()}` };
}

export const http = axios.create({
  // attach api base url here
  baseURL: 'http://127.0.0.1:3333/api/v1',
  headers: { ...Authorization },
});
