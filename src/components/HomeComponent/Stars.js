import React from 'react';
import ReactStars from 'react-stars';

function Stars(props) {
  const { rating } = props;
  return (
    <ReactStars
      size={24}
      count={5}
      isHalf
      edit={false}
      value={rating}
      color="white"
      activeColor="orange"
    />
  );
}

export default Stars;
