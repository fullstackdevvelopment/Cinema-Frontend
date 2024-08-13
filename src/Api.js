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

  static filteredMovieList({
    page = 1, limit = 6, title = '', categoryIds = [], countries = [], years = [],
  }) {
    const categoryIdsParam = categoryIds.length > 0 ? `&categoryIds=${categoryIds.join(',')}` : '';
    const countriesParam = countries.length > 0 ? `&countries=${countries.join(',')}` : '';
    const yearsParam = years.length > 0 ? `&years=${years.join(',')}` : '';
    const titleParam = title.length > 0 ? `&title=${encodeURIComponent(title)}` : '';

    return api.get(`/movie/list/filtered?page=${page}&limit=${limit}${titleParam}${categoryIdsParam}${countriesParam}${yearsParam}`);
  }

  static categoryList() {
    return api.get('/category/list');
  }

  static movieList() {
    return api.get('/movie/list');
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

  static updatePaymentStatus(stripePaymentId, status) {
    return api.post('/payment/update-payment-status', { stripePaymentId, status });
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

  static sendMessage(data) {
    return api.post('/email/send', data);
  }

  static emailVerification(payload) {
    return api.post('/users/verifications', payload);
  }

  static resetPassword(payload) {
    return api.post('/users/reset/password', payload);
  }

  static resetPasswordFinished({ verificationCode, password }) {
    return api.post(`/users/reset/password/${verificationCode}`, { password });
  }

  static uploadTicket(data) {
    return api.post('/users/pdf/upload', data);
  }

  static userUpdate(data) {
    return api.put('/users/update', data);
  }
}

export default Api;
