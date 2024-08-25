import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import { PulseLoader, RingLoader } from 'react-spinners';
import DatePicker from 'react-datepicker';
import Pagination from '../../helpers/Pagination';
import { scheduleList } from '../../store/actions/scheduleList';
import ScheduleItem from './ScheduleItem';
import 'react-datepicker/dist/react-datepicker.css';

function ScheduleList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.scheduleList.list);
  const listStatus = useSelector((state) => state.scheduleList.status);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(scheduleList());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleDateChange = (selectedOptions) => {
    setSelectedDate(selectedOptions);
  };

  const handleHourChange = (selectedOptions) => {
    setSelectedHour(selectedOptions);
  };

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const filteredListByDate = selectedDate
    ? list?.filter(
      (item) => new Date(item.date).toISOString().slice(0, 10) === moment(selectedDate).format('YYYY-MM-DD'),
    )
    : list;
  const filteredListByHour = selectedHour
    ? filteredListByDate?.filter(
      (item) => item.schedules[0].times.some((time) => {
        const formattedTime = moment.utc(`${moment().format('YYYY-MM-DD')}T${time}`)
          .tz('Asia/Yerevan')
          .format('HH:mm');
        return formattedTime === moment(selectedHour).format('HH:mm');
      }),
    )
    : filteredListByDate;

  const filteredListByTitle = filteredListByHour?.filter(
    (item) => item.movie.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const sortedList = filteredListByTitle?.slice().sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const count = sortedList?.length;
  const totalPages = Math.ceil(count / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;

  const paginatedSchedule = sortedList?.length > 4 ? sortedList.slice(startIndex, endIndex) : sortedList;

  const handleClickByTicket = (movieId, scheduleId) => {
    if (movieId && scheduleId) {
      navigate(`/ticket/buy/${movieId}/${scheduleId}`);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <div className="buyTicket__loader">
          <h1>
            Loading
            <PulseLoader color="#E8920B" />
          </h1>
          <RingLoader color="#E8920B" />
        </div>
      ) : listStatus === 'fail' ? (
        <div className="error">
          <div className="container">
            <div className="error__title">
              <h1>There is a problem with the servers, we apologize</h1>
              <PulseLoader color="#E8920B" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="schedule__filtracion">
            <div className="schedule__filtracion__block">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Date"
              />
              <DatePicker
                selected={selectedHour}
                onChange={(date) => handleHourChange(date)}
                dateFormat="HH:mm"
                placeholderText="Hour"
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Time"
                timeIntervals={15}
                timeFormat="HH:mm"
              />
            </div>
            <div className="schedule__filtracion__search">
              <input
                className="sign__in__input"
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          {paginatedSchedule?.length > 0 ? (
            <div className="schedule__dashboard__table__block">
              {paginatedSchedule?.map((item) => (
                <div key={item.id} className="schedule__dashboard__table__block__item">
                  <ScheduleItem
                    title={item.movie.title}
                    duration={item.movie.duration}
                    moviePhoto={item.movie.photos[0]?.moviePhoto}
                    times={item.schedules[0]?.times}
                    dates={item.schedules[0]?.date}
                  />
                  <div
                    className="schedule__dashboard__table__block__item__btn"
                    onClick={() => handleClickByTicket(item.movie.id, item.id)}
                  >
                    <Button>
                      Buy Ticket
                      <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                  </div>
                </div>
              ))}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </div>
          ) : (
            <div className="no__schedule">
              <p>There are no films to show at the moment</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ScheduleList;
