import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../HomeComponent/Stars';

function CommentsBlock(props) {
  const {
    comment, userImage, firstName, lastName, voters, rating,
  } = props;
  return (
    <div className="comments__page">
      <div className="comments__stars">
        <Stars rating={rating} />
      </div>
      <div className="comments__block__text">
        <p className="comments__title">
          {comment}
        </p>
      </div>
      <div className="comments__page__desc">
        <div className="comments__page__desc__img">
          <img src={`http://localhost:4000/${userImage}`} alt="users" />
        </div>
        <div className="comments__page__desc__banner">
          <div className="comments__page__desc__banner__title">
            <h2>{`${firstName} ${lastName}`}</h2>
          </div>
          <div className="comments__page__desc__banner__view">
            <p>{`${voters} voters`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsBlock;

CommentsBlock.propTypes = {
  comment: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  voters: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
