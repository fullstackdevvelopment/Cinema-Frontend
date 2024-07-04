import React from 'react';
import NukaCarousel from 'nuka-carousel';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactStars from 'react-rating-stars-component';
import { NavLink } from 'react-router-dom';
import slideImg from '../../assets/images/img_1.svg';
import slide1 from '../../assets/images/slide1.jpg';
import actorPhoto from '../../assets/images/google.png';

function Carousel() {
  return (
    <div className="home__carousel">
      <NukaCarousel>
        <div className="carousel__block" style={{ backgroundImage: `url(${slide1})` }}>
          <div className="container">
            <div className="carousel__block__slide">
              <div className="carousel__block__slide__img">
                <img src={slideImg} alt="slide" />
              </div>
              <div className="carousel__block__slide__content">
                <h2>1+1</h2>
                <ReactStars
                  className="rating"
                  count={5}
                  size={30}
                  activeColor="orange"
                />
                <p>180k Voters</p>
                <div className="carousel__block__slide__content__photo">
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                </div>
                <div className="carousel__block__slide__content__button">
                  <NavLink to="#">Watch Trailer</NavLink>
                  <NavLink className="green__btn" to="#">Play Now</NavLink>
                  <NavLink className="orange__btn" to="#">Get Tickets</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel__block" style={{ backgroundImage: `url(${slide1})` }}>
          <div className="container">
            <div className="carousel__block__slide">
              <div className="carousel__block__slide__img">
                <img src={slideImg} alt="slide" />
              </div>
              <div className="carousel__block__slide__content">
                <h2>1+1</h2>
                <ReactStars
                  className="ratingkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
                  count={5}
                  size={30}
                  activeColor="orange"
                />
                <p>180k Voters</p>
                <div className="carousel__block__slide__content__photo">
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                  <img src={actorPhoto} alt="actor" />
                </div>
                <div className="carousel__block__slide__content__button">
                  <NavLink to="#">Watch Trailer</NavLink>
                  <NavLink className="green__btn" to="#">Play Now</NavLink>
                  <NavLink className="orange__btn" to="#">Get Tickets</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NukaCarousel>
    </div>
  );
}

export default Carousel;
