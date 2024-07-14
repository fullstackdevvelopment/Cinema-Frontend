import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../helpers/Pagination';
import { scheduleList } from '../../store/actions/scheduleList';
import ScheduleItem from './ScheduleItem';

function ScheduleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.scheduleList.list);

  useEffect(() => {
    dispatch(scheduleList());
  }, [dispatch]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);
  console.log(list, 'list');
  const sortedList = list.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log(sortedList, 'sorted');
  const totalPages = Math.ceil(sortedList.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const paginatedSchedule = sortedList.slice(startIndex, endIndex);

  return (
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
        </div>
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default ScheduleList;
