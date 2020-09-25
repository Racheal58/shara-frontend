import axios from 'axios';
import { getToken } from './helpers';

let http;

(async () => {
  let Authorization;

  if (getToken()) {
    Authorization = { Authorization: `Bearer ${getToken()}` };
  }

  http = axios.create({
    baseURL: 'https://shara-api.herokuapp.com/api/v1',
    headers: { ...Authorization },
  });
})();

export { http };
