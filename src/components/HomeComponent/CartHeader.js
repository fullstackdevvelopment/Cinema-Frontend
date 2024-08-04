import React from 'react';

function CartHeader(props) {
  const { name } = props;
  return (
    <div className="cinema__home__latest__header">
      <div className="container">
        <div className="cinema__home__latest__header__title">
          <span className="cinema__home__latest__header__title__item">{name}</span>
        </div>
      </div>

    </div>
  );
}

export default CartHeader;
