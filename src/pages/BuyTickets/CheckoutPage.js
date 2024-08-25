import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { userData } from '../../store/actions/userData';

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.data.user);
  const userToken = sessionStorage.getItem('token');
  const clientSecret = searchParams.get('clientSecret');

  useEffect(() => {
    if (!userToken) {
      navigate('/signIn');
    } else {
      dispatch(userData(userToken));
    }
  }, [userToken, navigate, dispatch]);

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
        userEmail={user?.email}
        userName={`${user?.firstName} ${user?.lastName}`}
      />
    </Elements>
  );
}

export default CheckoutPage;
