import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader, RingLoader } from 'react-spinners';
import CartHeader from '../components/HomeComponent/CartHeader';
import Cart from '../components/HomeComponent/Cart';
import Carousel from '../components/HomeComponent/Carousel';
import Wrapper from '../components/commons/Wrapper';
import { movieList } from '../store/actions/movieList';

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);
  const listStatus = useSelector((state) => state.movieList.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(movieList({ page: 1, limit: 6 }));
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
          <Carousel />
          <div className="cinema__home__latest">
            <div className="container">
              <CartHeader name="Latest" />
              <div className="cinema__home__latest__row">
                {list?.map((movie) => (
                  <Cart
                    key={movie.id}
                    moviePhoto={movie.photos[0].moviePhoto}
                    title={movie.title}
                    rating={movie.rating}
                    voters={movie.voters}
                    movieId={movie.id}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="cinema__home__latest">
            <div className="container">
              <CartHeader name="Coming soon" />
              <div className="cinema__home__latest__row">
                {list?.map((movie) => (
                  <Cart
                    key={movie.id}
                    moviePhoto={movie.photos[0].moviePhoto}
                    title={movie.title}
                    rating={movie.rating}
                    voters={movie.voters}
                    movieId={movie.id}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="cinema__home__latest">
            <div className="container">
              <CartHeader name="Featured movies" />
              <div className="cinema__home__latest__row">
                {list?.map((movie) => (
                  <Cart
                    key={movie.id}
                    moviePhoto={movie.photos[0].moviePhoto}
                    title={movie.title}
                    rating={movie.rating}
                    voters={movie.voters}
                    movieId={movie.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default Home;
