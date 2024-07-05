import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../components/HomeComponent/Cart';
import Wrapper from '../components/commons/Wrapper';
import { movieList } from '../store/actions/movieList';

function Catalog() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  useEffect(() => {
    dispatch(movieList({ page: 1, limit: 6 }));
  }, [dispatch]);
  console.log(list);
  return (
    <Wrapper className="cinema__home">
      <div className="cinema__home__latest">
        <div className="container">
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
    </Wrapper>
  );
}

export default Catalog;
