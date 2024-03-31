import React from 'react';
import cartLogo from '../../assets/images/img_1.svg';
import Stars from './Stars';

function Cart() {
  return (
    <div className="cinema__home__latest__cart">
      <div className="cinema__home__latest__cart__item">
        <img src={cartLogo} alt="" className="cinema__home__latest__cart__item__img" />
        <div className="cinema__home__latest__cart__item__group">
          <span className="cinema__home__latest__cart__item__group__title">
            1+1
          </span>
          <Stars />
        </div>
        <div className="cinema__home__latest__cart__item__dec">
          <p className="cinema__home__latest__cart__item__group__title">
            180k Voters
          </p>
        </div>
      </div>
    </div>
  );
}
export default Cart;
