import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Elements } from '@stripe/react-stripe-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/style/style.scss';
import store from './store';

const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
);

reportWebVitals();
