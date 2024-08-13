import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader, RingLoader } from 'react-spinners';
import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import CartHeader from '../components/HomeComponent/CartHeader';
import Cart from '../components/HomeComponent/Cart';
import Wrapper from '../components/commons/Wrapper';
import { movieList } from '../store/actions/movieList';
import HomeCarousel from '../components/HomeComponent/HomeCarousel';

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);
  const listStatus = useSelector((state) => state.movieList.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(movieList());
      setLoading(false);
    })();
  }, [dispatch]);
  return (
    <Wrapper>
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
        <div className="cinema__home">
          <HomeCarousel />
          {list?.listFilterByLatest.length > 0 ? (
            <div className="cinema__home__latest">
              <div className="container">
                <CartHeader name="Latest" />
                <div className="cinema__home__latest__row">
                  <Carousel
                    cellSpacing={20}
                    dragging
                    slidesToShow={3}
                    wrapAround
                    speed={400}
                    slidesToScroll={1}
                    renderBottomCenterControls={null}
                    renderCenterLeftControls={({ previousSlide }) => (
                      <span className="cinema__home__latest__row__btn" onClick={previousSlide}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                      <span className="cinema__home__latest__row__btn" onClick={nextSlide}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    )}
                  >
                    {list?.listFilterByLatest?.map((movie) => (
                      <Cart
                        key={movie.id}
                        moviePhoto={movie.photos[0].moviePhoto}
                        title={movie.title}
                        rating={movie.rating}
                        voters={movie.voters}
                        movieId={movie.id}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          ) : null}
          {list?.listFilterByComingSoon.length > 0 ? (
            <div className="cinema__home__latest">
              <div className="container">
                <CartHeader name="Coming soon" />
                <div className="cinema__home__latest__row">
                  <Carousel
                    cellSpacing={20}
                    dragging
                    slidesToShow={3}
                    wrapAround
                    speed={400}
                    slidesToScroll={1}
                    renderBottomCenterControls={null}
                    renderCenterLeftControls={({ previousSlide }) => (
                      <span className="cinema__home__latest__row__btn" onClick={previousSlide}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                      <span className="cinema__home__latest__row__btn" onClick={nextSlide}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    )}
                  >
                    {list?.listFilterByComingSoon?.map((movie) => (
                      <Cart
                        key={movie.id}
                        moviePhoto={movie.photos[0].moviePhoto}
                        title={movie.title}
                        rating={movie.rating}
                        voters={movie.voters}
                        movieId={movie.id}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          ) : null}
          {list?.listFilterByFeaturedMovies.length > 0 ? (
            <div className="cinema__home__latest">
              <div className="container">
                <CartHeader name="Featured movies" />
                <div className="cinema__home__latest__row">
                  <Carousel
                    cellSpacing={20}
                    dragging
                    slidesToShow={3}
                    wrapAround
                    speed={400}
                    slidesToScroll={1}
                    renderBottomCenterControls={null}
                    renderCenterLeftControls={({ previousSlide }) => (
                      <span className="cinema__home__latest__row__btn" onClick={previousSlide}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                      <span className="cinema__home__latest__row__btn" onClick={nextSlide}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    )}
                  >
                    {list?.listFilterByFeaturedMovies?.map((movie) => (
                      <Cart
                        key={movie.id}
                        moviePhoto={movie.photos[0].moviePhoto}
                        title={movie.title}
                        rating={movie.rating}
                        voters={movie.voters}
                        movieId={movie.id}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Wrapper>
  );
}

export default Home;
