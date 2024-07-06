import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartHeader from '../components/HomeComponent/CartHeader';
import Cart from '../components/HomeComponent/Cart';
import Carousel from '../components/HomeComponent/Carousel';
import Wrapper from '../components/commons/Wrapper';
import { movieList } from '../store/actions/movieList';

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  useEffect(() => {
    dispatch(movieList({ page: 1, limit: 6 }));
  }, [dispatch]);
  console.log(list);
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default Home;
