import React from 'react';
import movie2 from '../assets/images/movie2.png';
import trailer from '../assets/images/trailer/trailer.mp4';
import users from '../assets/data/users';
import filmShots from '../assets/data/filmShots';
import Stars from '../components/HomeComponent/Stars';
import Wrapper from '../components/commons/Wrapper';
import Comments from '../components/Comment/Comments';

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
          <div className="details-card">
            <div className="details">
              <h2>Detalis</h2>
              <div className="details__card__line" />
              <div className="details-content">
                <div>
                  <strong>Detalis:</strong>
                  USA
                </div>
                <div className="details__card__line" />
                <div>
                  <strong>Language:</strong>
                  English
                </div>
                <div className="details__card__line" />
                <div>
                  <strong>Relise Date:</strong>
                  15 Feb 2022
                </div>
                <div className="details__card__line" />
                <div>
                  <strong>Director:</strong>
                  Jpn Smiths
                </div>
                <div className="details__card__line" />
              </div>
            </div>
            <div className="storyline">
              <h2>Storyline</h2>
              <div className="details__card__line" />
              <p>
                In front of a young climber, Kelly, her friend is killed. The heroine manages to
                record it on video, but the criminals notice her. The girl runs to the rock in the
                hope that the killers wont be able to find her there. However, the climb to the
                top turns out to be unpredictable, and Kelly realizes that she has fallen into a
                real trap.
              </p>
            </div>
          </div>
          <div><Comments /></div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Film;
