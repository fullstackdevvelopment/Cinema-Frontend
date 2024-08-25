import React, { useEffect, useState } from 'react';
import {
  useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement,
} from '@stripe/react-stripe-js';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { userData } from '../../store/actions/userData';
import { singleMovie } from '../../store/actions/singleMovie';
import { createBooking } from '../../store/actions/createBooking';
import stripeLogo from '../../assets/images/stripeLogo.png';

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#007bff',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontWeight: 'bold',
      fontSize: '16px',
      '::placeholder': {
        color: '#1158a5',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CheckoutForm(props) {
  const {
    movieId,
    scheduleId,
    date,
    hour,
    stageThree,
    seatsParam,
    clientSecret,
    userEmail,
    userName,
  } = props;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [email, setEmail] = useState(userEmail || '');
  const [name, setName] = useState(userName || '');
  const [riskInsights, setRiskInsights] = useState(null);
  const user = useSelector((state) => state.userData.data.user);
  const singleData = useSelector((state) => state.singleMovie.list);
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem('token');
  const seatParams = seatsParam ? seatsParam.split(',') : [];
  const selectedSeats = seatParams.map((param) => {
    const [row, seat, price] = param.split('&');
    return {
      row,
      seat,
      price,
    };
  });
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!userToken) {
      navigate('/signIn');
    } else {
      dispatch(userData(userToken));
      if (movieId) {
        (async () => {
          await dispatch(singleMovie(movieId));
        })();
      }
    }
  }, [userToken, navigate, dispatch, movieId]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (paymentStatus) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setTimeout(() => navigate(`/ticket/buy/${movieId}/${scheduleId}/${date}/${hour}/${stageThree}/${seatsParam}/final`), 0);
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [paymentStatus, navigate, movieId, scheduleId, date, hour, stageThree, seatsParam]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    if (email !== '' && name !== '') {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name,
            email,
          },
        },
      });
      if (error) {
        console.error(error);
        setLoading(false);
        setErrors({
          errors: 'A processing error occurred.',
        });
      } else if (paymentIntent.status === 'succeeded') {
        setLoading(false);
        const riskData = paymentIntent?.charges?.data[0]?.payment_method_details?.card?.risk_level;
        setRiskInsights(riskData);

        const bookingData = selectedSeats.map((seat) => ({
          userId: user.id,
          movieId: singleData.id,
          bookingRow: seat.row,
          seatNumber: seat.seat,
          status: 'Booked',
          ticketPrice: seat.price,
          scheduleId,
        }));

        const bookingResults = await dispatch(createBooking(bookingData));

        if (createBooking.fulfilled.match(bookingResults)) {
          setPaymentStatus(true);
          setLoading(false);
        } else {
          setLoading(false);
          console.error('Booking failed:', bookingResults);
        }
      }
    } else {
      setLoading(false);
      setErrors({
        errors: 'Please fill in all fields.',
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {paymentStatus ? (
        <div className="checkout__form__success">
          <div className="checkout__form__block">
            <img src={stripeLogo} alt="stripeLogo" />
            <span className="checkout__form__test">TEST MODE</span>
            <h2 className="checkout__form__block__title">PAYMENT SUCCESSFUL!</h2>
            <p className="checkout__form__block__text">Thank you for your purchase</p>
            <p
              className="checkout__form__block__link"
            >
              {`You will be redirected to the next page in ${countdown} seconds...`}
            </p>
            <FontAwesomeIcon icon={faCircleCheck} />

            {riskInsights ? (
              <div className="checkout__form__risk-insights">
                <h3>Risk Insights:</h3>
                <p>{`Risk Level: ${riskInsights}`}</p>
                <p>This transaction is missing billing address, which impacts fraud detection.</p>
              </div>
            ) : (
              <p>No risk insights available.</p>
            )}
          </div>
        </div>
      ) : (
        <form className="checkout__form" onSubmit={handleSubmit}>
          <div className="container">
            <div className="checkout__form__block">
              <img src={stripeLogo} alt="stripeLogo" />
              <span className="checkout__form__test">TEST MODE</span>
              <p className="checkout__form__desc">Enter your details to complete your purchase</p>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Name on Card"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="card-element">
                <CardNumberElement options={{
                  CARD_OPTIONS,
                  placeholder: 'Card Number',
                  style: CARD_OPTIONS.style,
                }}
                />
              </div>
              <div className="card-element">
                <CardExpiryElement options={{
                  CARD_OPTIONS,
                  placeholder: 'Expire Date',
                  style: CARD_OPTIONS.style,
                }}
                />
              </div>
              <div className="card-element">
                <CardCvcElement options={{
                  CARD_OPTIONS,
                  placeholder: 'CVC',
                  style: CARD_OPTIONS.style,
                }}
                />
              </div>
              <Button
                type="submit"
                disabled={!stripe}
                variant="contained"
                color="primary"
              >
                {loading ? (
                  <ClipLoader color="#fff" className="loading" />
                ) : ('Buy')}
              </Button>
              {errors.errors ? (
                <div className="error__payment">
                  <span>{errors.errors}</span>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default CheckoutForm;

CheckoutForm.propTypes = {
  movieId: PropTypes.string.isRequired,
  scheduleId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  stageThree: PropTypes.string.isRequired,
  seatsParam: PropTypes.string.isRequired,
  clientSecret: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};
