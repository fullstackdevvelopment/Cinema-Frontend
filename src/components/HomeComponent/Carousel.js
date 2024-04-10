import React from 'react';
import NukaCarousel from 'nuka-carousel';
import slideImg from '../../assets/images/img_1.svg';

function Carousel() {
  return (
    <div className="home__carousel">
      <div className="carousel__block">
        <NukaCarousel>
          <div className="container">
            <div>
              <div>
                <img src={slideImg} alt="slide" />
              </div>
              <div>
                <h2>title</h2>
                <span>rating</span>
                <p>voters</p>
                <div>
                  <p>photos</p>
                  <p>photos</p>
                  <p>photos</p>
                  <p>photos</p>
                  <p>photos</p>
                  <p>photos</p>
                </div>
                <div>
                  <p>Watch Trailer</p>
                  <p>Play Now</p>
                  <p>Get Tickets</p>
                </div>
              </div>
            </div>
          </div>
        </NukaCarousel>
      </div>
    </div>
  );
}

export default Carousel;
