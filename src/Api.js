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

  static singleMovie(movieId) {
    return api.get(`/movie/single/${movieId}`);
  }

  static movieList(page = 1, limit = 6) {
    return api.get(`/movie/list?page=${page}&limit=${limit}`);
  }

  static categoryList() {
    return api.get('/category/list');
  }

  static countryList() {
    return api.get('/movie/countries');
  }

  static scheduleList() {
    return api.get('/schedule/list');
  }

  static reviewList(movieId) {
    return api.get(`/review/list/${movieId}`);
  }

  static createReview({ userId, movieId, comment }) {
    return api.post(`/review/create/${userId}/${movieId}`, comment);
  }

  static createPaymentIntent(amount, currency = 'usd') {
    return api.post('/payment/create-payment-intent', { amount, currency });
  }

  static updatePaymentStatus(paymentIntentId, status) {
    return api.post('/payment/update-payment-status', { paymentIntentId, status });
  }

  static handleWebhook(body) {
    return api.post('/payment/webhook', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static createBooking(data) {
    return api.post('/booking/create', data);
  }
}

export default Api;
