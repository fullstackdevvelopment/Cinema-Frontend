import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment-timezone';
import { PulseLoader, RingLoader } from 'react-spinners';
import _ from 'lodash';
import { Alert, Snackbar } from '@mui/material';
import Rating from '@mui/material/Rating';
import Wrapper from '../../components/commons/Wrapper';
import { singleMovie } from '../../store/actions/singleMovie';
import { scheduleList } from '../../store/actions/scheduleList';

function BuyTicketStageOne() {
  const { movieId, scheduleId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const singleData = useSelector((state) => state.singleMovie.list);
  const list = useSelector((state) => state.scheduleList.list);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [stage, setStage] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const userToken = sessionStorage.getItem('token');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (movieId) {
      (async () => {
        setLoading(true);
        await dispatch(singleMovie(movieId));
        await dispatch(scheduleList());
        setLoading(false);
      })();
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    if (!userToken) {
      navigate('/signIn');
    }
  }, [userToken, navigate]);

  const convertDuration = (minutes) => {
    const dur = moment.duration(minutes, 'minutes');
    const hours = dur.hours();
    const remainingMinutes = dur.minutes();
    return `${hours}h. ${remainingMinutes}min.`;
  };

  const filteredSchedule = scheduleId
    ? list.filter((item) => item.id === parseInt(scheduleId, 10))
    : list.filter((item) => item.movie.id === parseInt(movieId, 10));

  const handleClick = useCallback(() => {
    const date = selectedDate;
    if (movieId && scheduleId && date && selectedTime && stage) {
      navigate(`/ticket/buy/${movieId}/${scheduleId}/${date}/${selectedTime}/${stage}`);
      setStage(stage + 1);
    } else if (movieId && filteredSchedule[0]?.id && date && selectedTime && stage) {
      navigate(`/ticket/buy/${movieId}/${filteredSchedule[0]?.id}/${date}/${selectedTime}/${stage}`);
      setStage(stage + 1);
    } else if (selectedTime === null) {
      setSnackbarMessage('Please select a session time');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [scheduleId, movieId, selectedTime, stage, filteredSchedule, selectedDate, navigate]);

  const handleCheckboxChange = (date, time) => {
    const formattedTime = moment.utc(`${date}T${time}`).tz('Asia/Yerevan').format('HH:mm');
    if (selectedTime === formattedTime && selectedDate === date) {
      setSelectedTime(null);
      setSelectedDate(null);
    } else {
      setSelectedTime(formattedTime);
      setSelectedDate(date);
    }
  };

  const stageClassName = stage === 1 ? 'buyTicket__stages__header__block__tickets active' : 'buyTicket__stages__header__block__tickets';

  return (
    <Wrapper>
      <div className="buyTicket">
        {loading ? (
          <div className="buyTicket__loader">
            <h1>
              Loading
              <PulseLoader color="#E8920B" />
            </h1>
            <RingLoader color="#E8920B" />
          </div>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {singleData && singleData.stills && singleData.stills.length > 0 ? (
              <>
                <div className="buyTicket__stages">
                  <div className="container">
                    <div className="buyTicket__stages__header">
                      <div className="buyTicket__stages__header__block">
                        <div className={stageClassName}>
                          <span />
                          <p>1. Tickets</p>
                        </div>
                        <span className="buyTicket__stages__header__block__span" />
                        <div className="buyTicket__stages__header__block__tickets">
                          <span />
                          <p>2. Seats</p>
                        </div>
                        <span className="buyTicket__stages__header__block__span" />
                        <div className="buyTicket__stages__header__block__tickets">
                          <span />
                          <p>3. Checkout</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="buyTicket__block"
                  style={{ backgroundImage: `url(http://localhost:4000/${singleData?.stills[0]?.stillPath})` }}
                >
                  <div className="container">
                    <div className="buyTicket__block__item">
                      <div className="buyTicket__block__item__img">
                        <img
                          src={`http://localhost:4000/${singleData?.photos[0].moviePhoto}`}
                          alt={singleData?.title}
                        />
                      </div>
                      <div className="buyTicket__block__item__desc">
                        <div className="buyTicket__block__item__desc__rating">
                          <h2>{singleData?.title}</h2>
                          <Rating
                            className="rating"
                            name="movie-rating"
                            value={singleData?.rating || 0}
                            precision={0.5}
                            readOnly
                            size="small"
                            sx={{ color: '#e8920b' }}
                          />
                        </div>
                        <div className="buyTicket__block__item__desc__hour">
                          <p>{convertDuration(singleData?.duration)}</p>
                        </div>
                        <div className="buyTicket__block__item__desc__main">
                          <h1>{singleData?.storyLine}</h1>
                        </div>
                        <div className="buyTicket__block__item__desc__foot">
                          <p className="buyTicket__block__item__desc__foot__p">Fmovie</p>
                          <span className="buyTicket__block__item__desc__foot__span">cinema</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="buyTicket__block__schedule">
                  <div className="container">
                    <div className="buyTicket__block__schedule__block">
                      <div className="buyTicket__block__schedule__header">
                        <p className="buyTicket__block__schedule__header__title">
                          Schedule
                        </p>
                      </div>
                      <div className="buyTicket__block__schedule__main">
                        <div className="buyTicket__block__schedule__main__block">
                          <p>{'Dates: '}</p>
                          <div className="buyTicket__block__schedule__main__block__time">
                            <div className="buyTicket__block__schedule__main__block__time__content">
                              <span>{'Hours: '}</span>
                            </div>
                          </div>
                        </div>
                        {filteredSchedule.map((item) => (
                          <div key={item.id} className="buyTicket__block__schedule__main__block">
                            <p>{item.date}</p>
                            <div className="buyTicket__block__schedule__main__block__time">
                              {item.schedules[0].times.map((time) => (
                                <div
                                  key={_.uniqueId(`${item.id}-${time}`)}
                                  className="buyTicket__block__schedule__main__block__time__content"
                                >
                                  <span>
                                    {moment.utc(`${item.date}T${time}`)
                                      .tz('Asia/Yerevan')
                                      .format('HH:mm')}
                                  </span>
                                  <Checkbox
                                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                                    {...label}
                                    checked={selectedTime === moment.utc(`${item.date}T${time}`).tz('Asia/Yerevan').format('HH:mm') && selectedDate === item.date}
                                    onChange={() => handleCheckboxChange(item.date, time)}
                                    disabled={selectedTime !== null && (selectedTime !== moment.utc(`${item.date}T${time}`).tz('Asia/Yerevan').format('HH:mm') || selectedDate !== item.date)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="buyTicket__button">
                  <div className="container">
                    <div onClick={handleClick}>
                      <button type="submit" className="orange__btn">Next</button>
                    </div>
                  </div>
                </div>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={() => setSnackbarOpen(false)}
                >
                  <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </>
            ) : (
              <p>No data available</p>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default BuyTicketStageOne;
