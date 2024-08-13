import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
  const {
    movieId,
    scheduleId,
    date,
    hour,
    stageThree,
    seatsParam,
  } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clientSecret = searchParams.get('clientSecret');

  if (!clientSecret) {
    navigate('/');
    return null;
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        movieId={movieId}
        scheduleId={scheduleId}
        date={date}
        hour={hour}
        stageThree={stageThree}
        seatsParam={seatsParam}
        clientSecret={clientSecret}
      />
    </Elements>
  );
}

export default CheckoutPage;
