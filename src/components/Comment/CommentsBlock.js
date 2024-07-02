import React from 'react';
import Stars from '../HomeComponent/Stars';
import CommentsImg from '../../assets/images/users/user1.png';

function CommentsBlock() {
  return (
    <div className="comments__page">
      <div className="comments__stars"><Stars /></div>
      <div>
        <p className="comments__title">
          This is the best movie I have ever seen. Ive watched it for
          the hundredth time, but every time its like the first. In the end, it grows to tears, no
          matter how many times
        </p>
      </div>
      <div className="comments__page__desc">
        <div className="comments__page__desc__img">
          <img src={CommentsImg} alt="users" />
        </div>
        <div className="comments__page__desc__banner">
          <div className="comments__page__desc__banner__title">
            <h2>Jon Tomilson</h2>
          </div>
          <div className="comments__page__desc__banner__view">
            <p>100K Voters</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsBlock;
