import React from 'react';
import Stars from '../HomeComponent/Stars';

function CommentsBlock() {
  return (
    <div className="comments__page">
      <div className="comments__stars"><Stars /></div>
      <p className="comments__title">Hello</p>
    </div>
  );
}

export default CommentsBlock;
