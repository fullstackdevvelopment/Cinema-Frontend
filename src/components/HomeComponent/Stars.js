import React from 'react';
import Rating from '@mui/material/Rating';

function Stars(props) {
  const { rating } = props;
  return (
    <Rating
      name="movie-rating"
      value={rating || 0}
      precision={0.5}
      readOnly
      size="small"
      sx={{ color: '#e8920b' }}
    />
  );
}

export default Stars;
