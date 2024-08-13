import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader, PulseLoader, RingLoader } from 'react-spinners';
import Wrapper from '../../components/commons/Wrapper';
import { singleMovie } from '../../store/actions/singleMovie';
import { userData } from '../../store/actions/userData';
import { createPaymentIntent } from '../../store/actions/payment';

function BuyTicketStageThree() {
  const {
    movieId, scheduleId, date, hour, stage, queryString,
  } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleData = useSelector((state) => state.singleMovie.list);
  const user = useSelector((state) => state.userData.data.user);
  const [loading, setLoading] = useState(false);
  const [stageThree, setStageThree] = useState(parseInt(stage, 10) + 1);
  const userToken = sessionStorage.getItem('token');
  const seatParams = queryString ? queryString.split(',') : [];
  const selectedSeats = seatParams.map((param) => {
    const [row, seat, price] = param.split('&');
    return { row, seat, price };
  });
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (!userToken) {
      navigate('/signIn');
    } else {
      dispatch(userData(userToken));
      if (movieId) {
        (async () => {
          setLoading(true);
          await dispatch(singleMovie(movieId));
          setStageThree(parseInt(stage, 10) + 1);
          setLoading(false);
        })();
      }
    }
  }, [userToken, navigate, dispatch, movieId, stage]);

  const handlePayment = async () => {
    const userConfirmed = window.confirm('Are you sure you want to buy a ticket?');

    if (!userConfirmed) {
      return;
    }

    try {
      setPaymentLoading(true);
      const amount = selectedSeats.reduce((acc, seat) => acc + parseInt(seat.price, 10), 0) * 100;
      const currency = 'usd';

      const paymentResult = await dispatch(createPaymentIntent({ amount, currency }));

      if (createPaymentIntent.fulfilled.match(paymentResult)) {
        setPaymentLoading(false);
        const { clientSecret } = paymentResult.payload;
        const seatsParam = selectedSeats.map((seat) => `${seat.row}&${seat.seat}&${seat.price}`);
        const checkoutUrl = `/${movieId}/${scheduleId}/${date}/${hour}/${stageThree}/${seatsParam}/checkout?clientSecret=${clientSecret}`;
        navigate(checkoutUrl);
      } else {
        console.error(paymentResult.payload);
      }
    } catch (error) {
      console.error('Error creating payment ID:', error);
    }
  };

  const stageClassName = (stageThree === 3 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets');
  const stageClassNameTwo = (stageThree === 3 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets');
  const stageClassNameThree = (stageThree === 3 ? 'buyTicket__stages__header__block__tickets active' : 'buyTicket__stages__header__block__tickets');

  return (
    <Wrapper>
      {loading ? (
        <div className="buyTicket__loader">
          <h1>
            Loading
            <PulseLoader color="#E8920B" />
          </h1>
          <RingLoader color="#E8920B" />
        </div>
      ) : (
        <>
          <div className="buyTicket__stages">
            <div className="container">
              <div className="buyTicket__stages__header">
                <div className="buyTicket__stages__header__block">
                  <div className={stageClassName}>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>1. Tickets</p>
                  </div>
                  <span className="buyTicket__stages__header__block__span" />
                  <div className={stageClassNameTwo}>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>2. Seats</p>
                  </div>
                  <span className="buyTicket__stages__header__block__span" />
                  <div className={stageClassNameThree}>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>3. Checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {singleData && singleData.stills && singleData.stills.length > 0 ? (
            <div className="buyTicket__stages__payment">
              <div
                className="buyTicket__stages__payment__block"
                style={{ backgroundImage: `url(http://localhost:4000/${singleData?.stills[0]?.stillPath})` }}
              >
                <div className="container">
                  <div className="buyTicket__stages__payment__block__content">
                    <div className="buyTicket__stages__payment__block__content__title">
                      <h2>Review order</h2>
                    </div>
                    <div className="buyTicket__stages__payment__block__content__desc">
                      <div className="buyTicket__stages__payment__block__content__desc__img">
                        <img src={`http://localhost:4000/${singleData?.photos[0]?.moviePhoto}`} alt="movie" />
                      </div>
                      <div className="buyTicket__stages__payment__block__content__desc__text">
                        <div className="buyTicket__stages__payment__block__content__desc__text__item">
                          <h2>{singleData?.title}</h2>
                        </div>
                        <div className="buyTicket__stages__payment__block__content__desc__text__item">
                          <p>Play Cinema, S SA</p>
                        </div>
                        <div className="buyTicket__stages__payment__block__content__desc__text__item">
                          <p>{date}</p>
                          <p>{`${hour} AM`}</p>
                        </div>
                        <div className="buyTicket__stages__payment__block__content__desc__text__item">
                          <p>{`${selectedSeats.length} Ticket(s)`}</p>
                        </div>
                        {selectedSeats.map((seat) => (
                          <div
                            key={`${seat.row}${seat.seat}${seat.price}`}
                            className="buyTicket__stages__payment__block__content__desc__text__item"
                          >
                            <p>
                              {seat.row}
                            </p>
                            <p>
                              {seat.seat}
                            </p>
                          </div>
                        ))}
                        <div className="buyTicket__stages__payment__block__content__desc__text__item">
                          <p>{`Total Price: $${selectedSeats.reduce((sum, seat) => sum + parseFloat(seat.price), 0)}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="buyTicket__stages__payment__personal">
                <div className="container">
                  <div className="buyTicket__stages__payment__personal__title">
                    <h2>Personal Details</h2>
                  </div>
                  {user && (
                    <div className="buyTicket__stages__payment__personal__content">
                      <p>{user.firstName}</p>
                      <p>{user.email}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="buyTicket__stages__payment__btn">
                <div className="container">
                  <div className="buyTicket__stages__payment__btn__block">
                    <Button onClick={handlePayment}>
                      {paymentLoading ? (
                        <ClipLoader color="#fff" className="loading" />
                      ) : ('Next')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="buyTicket__loader">
              <h1>
                Loading
                <PulseLoader color="#E8920B" />
              </h1>
              <RingLoader color="#E8920B" />
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default BuyTicketStageThree;
