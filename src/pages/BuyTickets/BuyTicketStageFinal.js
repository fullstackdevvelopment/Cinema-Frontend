import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../components/commons/Wrapper';
import TicketPdf from '../../components/BuyTickets/TicketPdf';
import { singleMovie } from '../../store/actions/singleMovie';

function BuyTicketStageFinal() {
  const {
    movieId, date, hour, stage, seatsParam,
  } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.singleMovie.list);
  const [stageFinal] = useState(parseInt(stage, 10) + 1);
  const [resultP, setResultP] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (movieId) {
      (async () => {
        await dispatch(singleMovie(movieId));
      })();
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    const result = [];
    if (movie.photos) {
      for (let i = 0; i < resultP.length; i += 3) {
        result.push({
          row: resultP[i],
          seat: resultP[i + 1],
          price: resultP[i + 2],
          moviePhoto: movie?.photos[0]?.moviePhoto,
          duration: movie?.duration,
          title: movie?.title,
          date,
          hour,
        });
      }
      setData(result);
    }
  }, [resultP, movie]);

  useEffect(() => {
    const parts = seatsParam.split(',');
    const processedResultP = parts.flatMap((part) => part.split('&'));
    setResultP(processedResultP);
  }, [seatsParam]);

  const stageClassName = stageFinal === 4 ? 'buyTicket__stages__header__block__tickets active two ' : 'buyTicket__stages__header__block__tickets';
  const stageClassNameTwo = stageFinal === 4 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets';
  const stageClassNameThree = stageFinal === 4 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets';
  return (
    <Wrapper>
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
      <div className="buyTicket__stages__final">
        <div className="container">
          <div className="buyTicket__stages__final__block">
            <h1>Hooray!</h1>
            <div className="buyTicket__stages__final__block__content">
              {data ? (
                data.map((item) => (
                  <TicketPdf
                    key={`${item.row}${item.seat}`}
                    photo={item.moviePhoto}
                    title={item.title}
                    price={item.price}
                    duration={item.duration}
                    dateString={item.date}
                    hour={item.hour}
                    row={item.row}
                    seat={item.seat}
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BuyTicketStageFinal;
