import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
        <img loading="lazy" src={`http://localhost:4000/${moviePhoto}`} alt="movie" className="cinema__home__latest__cart__item__img" />
        <div className="cinema__home__latest__cart__item__group">
          <span className="cinema__home__latest__cart__item__group__title">
            {title}
          </span>
          <div className="cinema__home__latest__cart__item__dec">
            <Stars rating={rating} />
            <p className="cinema__home__latest__cart__item__group__p">
              {`${voters} Voters`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

Cart.propTypes = {
  moviePhoto: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  voters: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
};
