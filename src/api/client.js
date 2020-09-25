import axios from 'axios';
import { getToken } from './helpers';

let http;

(async () => {
  let Authorization;

  if (getToken()) {
    Authorization = { Authorization: `Bearer ${getToken()}` };
  }

  http = axios.create({
    baseURL: 'http://127.0.0.1:3333/api/v1',
    headers: { ...Authorization },
  });
})();

export { http };
