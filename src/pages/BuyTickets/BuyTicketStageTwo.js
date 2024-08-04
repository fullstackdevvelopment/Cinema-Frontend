import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader, RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import Wrapper from '../../components/commons/Wrapper';
import { scheduleList } from '../../store/actions/scheduleList';
import line from '../../assets/images/icons/line.png';

function BuyTicketStageTwo() {
  const {
    movieId, scheduleId, date, hour, stage,
  } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stageTwo, setStageTwo] = useState(null);
  const list = useSelector((state) => state.scheduleList.list);
  const filteredSchedule = list.filter((item) => item.id === parseInt(scheduleId, 10));
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (movieId) {
      (async () => {
        setLoading(true);
        await dispatch(scheduleList());
        setStageTwo(parseInt(stage, 10) + 1);
        setLoading(false);
      })();
    }
  }, [movieId, dispatch]);

  const rowsList = filteredSchedule.length > 0 ? [...filteredSchedule[0].rows] : [];

  const groupedRows = rowsList.reduce((acc, row) => {
    const { rowName } = row;
    if (!acc[rowName]) {
      acc[rowName] = [];
    }
    acc[rowName].push(row);
    return acc;
  }, {});

  const groupedRowsArray = Object.entries(groupedRows)
    .map(([rowName, rows]) => ({
      rowName,
      rows,
    }))
    .sort((a, b) => a.rowName.localeCompare(b.rowName));

  const handleSeatClick = (seatId, status) => {
    if (status === 'Booked') {
      return;
    }
    const seatInfo = rowsList.find((row) => row.id === seatId);
    setSelectedSeats((prevSelectedSeats) => {
      const isAlreadySelected = prevSelectedSeats.some((seat) => seat.id === seatId);
      if (isAlreadySelected) {
        return prevSelectedSeats.filter((seat) => seat.id !== seatId);
      }
      return [...prevSelectedSeats, seatInfo];
    });
  };

  const handleRemoveSeat = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((seat) => seat.id !== seatId));
  };

  const stageClassName = (stageTwo === 2 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets');
  const stageClassNameTwo = (stageTwo === 2 ? 'buyTicket__stages__header__block__tickets active' : 'buyTicket__stages__header__block__tickets');

  const handleBack = useCallback(() => {
    navigate(`/ticket/buy/${movieId}/${scheduleId}`);
  }, [movieId, scheduleId]);

  const handleNext = useCallback(() => {
    if (selectedSeats.length > 0) {
      const seatsInfo = selectedSeats.map((seat) => ({
        row: seat.rowName,
        seat: seat.seatCount,
        price: seat.seats[0].price,
      }));

      const queryString = seatsInfo
        .map((seat) => `${seat.row}&${seat.seat}&${seat.price}`);
      navigate(`/ticket/buy/${movieId}/${scheduleId}/${date}/${hour}/${stageTwo}/${queryString}`);
    }
  }, [selectedSeats, scheduleId, movieId, stageTwo, date, hour, navigate]);

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
          <div className="buyTicket__stages__seats">
            <div className="container">
              <div className="buyTicket__stages__seats__block">
                <div className="buyTicket__stages__seats__block__first">
                  <div className="buyTicket__stages__seats__block__first__content">
                    <div className="buyTicket__stages__seats__block__first__content__item">
                      <span />
                      <p>Your Seat</p>
                    </div>
                    <div className="buyTicket__stages__seats__block__first__content__item">
                      <span />
                      <p>Available</p>
                    </div>
                    <div className="buyTicket__stages__seats__block__first__content__item">
                      <span />
                      <p>Booked</p>
                    </div>
                  </div>
                </div>
                <div className="buyTicket__stages__seats__block__second">
                  <div className="buyTicket__stages__seats__block__second__content">
                    <div className="buyTicket__stages__seats__block__second__content__line">
                      <img src={line} alt="line" />
                    </div>
                    {groupedRowsArray.map((group) => (
                      <div
                        key={group.rowName}
                        className="buyTicket__stages__seats__block__second__content__item"
                      >
                        <p>{group.rowName}</p>
                        {group.rows.map((item) => (
                          <span
                            key={item.id}
                            onClick={() => handleSeatClick(item.id, item.seats[0].status)}
                            className={`
                              ${item.seats[0].status === 'Available' ? 'green' : 'red'} 
                              ${selectedSeats.some((seat) => seat.id === item.id) ? 'white' : ''}
                            `}
                          />
                        ))}
                        <p>{group.rowName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {selectedSeats.length > 0 && (
                <div className="buyTicket__stages__seats__block__info">
                  <div className="container">
                    <div className="buyTicket__stages__seats__block__info__content">
                      {selectedSeats.map((seat) => (
                        <div className="buyTicket__stages__seats__block__info__text" key={seat.id}>
                          <strong>{`${seat.rowName}`}</strong>
                          <p>row</p>
                          <strong>{`${seat.seatCount}`}</strong>
                          <p>seat</p>
                          <p>{`$${seat.seats[0].price}`}</p>
                          <FontAwesomeIcon
                            onClick={() => handleRemoveSeat(seat.id)}
                            icon={faXmark}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="buyTicket__stages__seats__btn">
                <Button onClick={handleBack}>Cancel</Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default BuyTicketStageTwo;
