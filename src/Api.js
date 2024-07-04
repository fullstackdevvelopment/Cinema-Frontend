import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

class Api {
  static login(data) {
    return api.post('/users/login', data);
  }

  static register(data) {
    return api.post('/users/register', data);
  }

  static userData(token) {
    return api.post('/users/single', token);
  }
}

export default Api;
