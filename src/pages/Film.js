import React from 'react';
import movie2 from '../assets/images/movie2.png';
import trailer from '../assets/images/trailer/trailer.mp4';
import users from '../assets/data/users';
import filmShots from '../assets/data/filmShots';
import Stars from '../components/HomeComponent/Stars';
import Wrapper from '../components/commons/Wrapper';

function Film() {
  return (
    <Wrapper>
      <div className="film">
        <div className="container">
          <div className="film__stars">
            <h2 className="film__title">On the Edge</h2>
            <Stars />
          </div>
          <div className="film__box">
            <figure className="film__box__image">
              <img src={movie2} alt="movie" />
              <div className="film__box__users">
                {users.map((user) => (
                  <figure key={user.id} className="film__box__users__item">
                    <img src={user.image} alt="user" />
                  </figure>
                ))}
              </div>
            </figure>
            <div className="film__box__movie">
              <video controls width="700">
                <track kind="captions" />
                <source className="film__box__movie__video" src={trailer} type="video/mp4" />
              </video>
              <div className="film__box__movie__shots">
                {filmShots.map((shot) => (
                  <figure key={shot.id} className="film__box__movie__shots__item">
                    <img src={shot.image} alt="shot" />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Film;
