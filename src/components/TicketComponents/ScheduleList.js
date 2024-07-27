import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment-timezone';
import { PulseLoader, RingLoader } from 'react-spinners';
import Pagination from '../../helpers/Pagination';
import { scheduleList } from '../../store/actions/scheduleList';
import ScheduleItem from './ScheduleItem';
import generateOptions from '../../helpers/GenerateOptions';
import generateHourOptions from '../../helpers/GenerateHourOptions';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    border: '2px solid #135f55',
    padding: '5px 19px',
    color: '#135f55',
    fontSize: '16px',
    width: '100%',
    fontWeight: '600',
    lineHeight: '21.09px',
    outline: 'none',
    boxShadow: 'none',
    '&:focus': {
      ...provided[':focus'],
      color: '#fff',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
    '&:hover': {
      ...provided[':hover'],
      outline: 'none',
      boxShadow: 'none',
    },
    '&:focus-visible': {
      ...provided[':focus-visible'],
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  option: (provided) => ({
    ...provided,
    background: '#135f55',
    color: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: '15px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '21.09px',
    width: '100%',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#135f55',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#135f55',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#135f55',
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '21.09px',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: '0',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#135f55 !important',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.7)' : 'rgba(19, 95, 85, 1)',
    borderRadius: '15px',
    boxShadow: '0px 0px 28px 5px rgba(19, 95, 85, 0.85)',
    border: 'none',
    outline: 'none',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0',
    margin: '2px',
  }),
  menuList: (base) => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '20px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: '#135f55',
      borderTopRightRadius: '15px',
      borderBottomRightRadius: '15px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderRadius: '20px',
      transition: 'all 0.3s',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#0c8575',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#062822 !important',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    padding: '0',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0',
  }),
  input: (provided) => ({
    ...provided,
    color: '#062822 !important',
  }),
  multiValue: (provided) => ({
    ...provided,
    background: '#135f55 !important',
    borderRadius: '15px',
    color: '#fff',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff !important',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff !important',
    transition: 'all 0.3s',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
    cursor: 'pointer',
    '&:hover': {
      ...provided[':hover'],
      outline: 'none',
      boxShadow: 'none',
      backgroundColor: '#1c796d !important',
    },
  }),
};

function ScheduleList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.scheduleList.list);
  const listStatus = useSelector((state) => state.scheduleList.status);
  const optionsDate = useMemo(() => generateOptions({ startDate: '2024-07-01', endDate: '2024-08-01' }), []);
  const optionsHour = useMemo(() => generateHourOptions({ startHour: '12', endHour: '20' }), []);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedHour, setSelectedHour] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch(scheduleList());
      setLoading(false);
    })();
  }, [dispatch]);

  const handleDateChange = (selectedOptions) => {
    setSelectedDate(selectedOptions || []);
  };

  const handleHourChange = (selectedOptions) => {
    setSelectedHour(selectedOptions || []);
  };

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const filteredListByDate = selectedDate.length
    ? list?.filter(
      (item) => selectedDate.some(
        (date) => new Date(item.date).toISOString().slice(0, 10) === date.value,
      ),
    )
    : list;

  const filteredListByHour = selectedHour.length
    ? filteredListByDate?.filter(
      (item) => selectedHour.some((hour) => item.schedules[0].times.some((time) => {
        const formattedTime = moment.utc(`${moment().format('YYYY-MM-DD')}T${time}`)
          .tz('Asia/Yerevan')
          .format('HH:mm');
        return formattedTime === hour.value;
      })),
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

  const paginatedSchedule = sortedList?.slice(startIndex, endIndex);

  const handleClickByTicket = (movieId, scheduleId) => {
    navigate(`/ticket/buy/${movieId}/${scheduleId}`);
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
              <Select
                options={optionsDate}
                isMulti
                styles={customStyles}
                name="categories"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Date"
                onChange={handleDateChange}
              />
              <Select
                options={optionsHour}
                isMulti
                styles={customStyles}
                name="categories"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Hour"
                onChange={handleHourChange}
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
        </>
      )}
    </>
  );
}

export default ScheduleList;
