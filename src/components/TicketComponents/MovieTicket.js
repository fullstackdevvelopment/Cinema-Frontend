import React from 'react';
import movie1 from '../../assets/images/movie1.png';
import Days from './Days';

function MovieTicket() {
  return (
    <div className="container">
      <h2 className="ticket__movie__title">2012</h2>
      <p className="ticket__movie__hour">
        2h. 13min.
      </p>
      <div className="ticket__box">
        <figure className="ticket__box__movie">
          <img src={movie1} alt="movie1" />
        </figure>
        <Days />
      </div>
    </div>
  );
}

export default MovieTicket;
