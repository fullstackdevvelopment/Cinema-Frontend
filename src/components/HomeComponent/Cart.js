import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Stars from './Stars';

function Cart(props) {
  const {
    moviePhoto, title, rating, voters, movieId,
  } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/film/${movieId}`);
  }, []);
  return (
    <div onClick={handleClick} className="cinema__home__latest__cart">
      <div className="cinema__home__latest__cart__item">
        <img src={`http://localhost:4000/${moviePhoto}`} alt="movie" className="cinema__home__latest__cart__item__img" />
        <div className="cinema__home__latest__cart__item__group">
          <span className="cinema__home__latest__cart__item__group__title">
            {title}
          </span>
          <Stars rating={rating} />
        </div>
        <div className="cinema__home__latest__cart__item__dec">
          <p className="cinema__home__latest__cart__item__group__title">
            {`${voters} Voters`}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Cart;
