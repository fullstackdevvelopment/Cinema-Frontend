import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader, RingLoader } from 'react-spinners';
import { FaCircle } from 'react-icons/fa';
import Wrapper from '../../components/commons/Wrapper';
import map from '../../assets/images/map.png';
import { singleMovie } from '../../store/actions/singleMovie';
import { userData } from '../../store/actions/userData';
import { createPaymentIntent, updatePaymentStatus } from '../../store/actions/payment';
import { createBooking } from '../../store/actions/createBooking';

function BuyTicketStageThree() {
  const {
    movieId, scheduleId, date, hour, stage, queryString,
  } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleData = useSelector((state) => state.singleMovie.list);
  const user = useSelector((state) => state.userData.data.user);
  const paymentStatus = useSelector((state) => state.payment.status);
  const paymentError = useSelector((state) => state.payment.error);
  const [loading, setLoading] = useState(false);
  const [stageThree, setStageThree] = useState(parseInt(stage, 10) + 1);
  const userToken = sessionStorage.getItem('token');
  const seatParams = queryString ? queryString.split(',') : [];
  const selectedSeats = seatParams.map((param) => {
    const [row, seat, price] = param.split('&');
    return { row, seat, price };
  });

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
      const amount = selectedSeats.reduce((acc, seat) => acc + parseInt(seat.price, 10), 0) * 100;
      const currency = 'usd';

      const paymentResult = await dispatch(createPaymentIntent({ amount, currency }));

      if (createPaymentIntent.fulfilled.match(paymentResult)) {
        const bookingData = selectedSeats.map((seat) => ({
          userId: user.id,
          movieId: singleData.id,
          bookingRow: seat.row,
          seatNumber: seat.seat,
          status: 'Booked',
          ticketPrice: seat.price,
          scheduleId,
        }));
        const { stripePaymentId } = paymentResult.payload.payment;
        const paymentStatusResult = await dispatch(updatePaymentStatus({ stripePaymentId, status: 'succeeded' }));
        if (updatePaymentStatus.fulfilled.match(paymentStatusResult)) {
          const bookingResults = await dispatch(createBooking(bookingData));

          if (createBooking.fulfilled.match(bookingResults)) {
            const seatsParam = selectedSeats.map((seat) => `${seat.row}&${seat.seat}&${seat.price}`);
            const newPath = `/ticket/buy/${movieId}/${scheduleId}/${date}/${hour}/${stageThree}/${seatsParam}/final`;
            navigate(newPath);
          } else {
            console.error('Booking failed:', bookingResults);
          }
        } else {
          console.error(paymentStatusResult.payload);
        }
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
                      <p>{user.lastName}</p>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="buyTicket__stages__payment__card">
                <div className="container">
                  <div className="buyTicket__stages__payment__card__title">
                    <h2>Payment Details</h2>
                  </div>
                  <div className="buyTicket__stages__payment__card__content">
                    <div className="buyTicket__stages__payment__card__content__block">
                      <img src={map} alt="map" />
                      <div className="card__view">
                        <p>VISA</p>
                      </div>
                      {user && (
                        <>
                          <div className="card__number">
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span><FaCircle /></span>
                            <span>{user?.cards[0]?.cardNumber.charAt(12)}</span>
                            <span>{user?.cards[0]?.cardNumber.charAt(13)}</span>
                            <span>{user?.cards[0]?.cardNumber.charAt(14)}</span>
                            <span>{user?.cards[0]?.cardNumber.charAt(15)}</span>
                          </div>
                          <div className="card__owner">
                            <div className="card__owner__name">
                              <p>{user?.cards[0]?.cardHolderName}</p>
                            </div>
                            <div className="card__owner__date">
                              <p>{user?.cards[0]?.expirationDate.slice(0, 2)}</p>
                              <span>/</span>
                              <p>{user?.cards[0]?.expirationDate.slice(2)}</p>
                            </div>
                            <div className="card__owner__cvc">
                              <p>{user?.cards[0]?.cvv}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="buyTicket__stages__payment__btn">
                <div className="container">
                  <div className="buyTicket__stages__payment__btn__block">
                    <Button onClick={handlePayment}>Next</Button>
                  </div>
                  {paymentStatus === 'pending' && (
                    <div className="buyTicket__loader">
                      <h1>
                        Loading
                        <PulseLoader color="#E8920B" />
                      </h1>
                      <RingLoader color="#E8920B" />
                    </div>
                  )}
                  {paymentStatus === 'fail' && paymentError && (
                    <div className="buyTicket__error">
                      <p>{paymentError.message || 'An error occurred while processing the payment'}</p>
                    </div>
                  )}
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