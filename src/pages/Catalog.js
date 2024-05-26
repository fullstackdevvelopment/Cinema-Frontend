import React from 'react';
import Cart from '../components/HomeComponent/Cart';
import Wrapper from '../components/commons/Wrapper';

function Catalog() {
  return (
    <Wrapper className="cinema__home">
      <div className="cinema__home__latest">
        <div className="container">
          <div className="cinema__home__latest__row">
            <Cart />
            <Cart />
            <Cart />
          </div>
          <div className="cinema__home__latest__row">
            <Cart />
            <Cart />
            <Cart />
          </div>
          <div className="cinema__home__latest__row">
            <Cart />
            <Cart />
            <Cart />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Catalog;
