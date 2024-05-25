import React from 'react';
import CartHeader from '../components/HomeComponent/CartHeader';
import Cart from '../components/HomeComponent/Cart';
import Carousel from '../components/HomeComponent/Carousel';
// import Header from '../components/commons/Header';
import Wrapper from '../components/commons/Wrapper';

function Home() {
  return (
    <Wrapper className="cinema__home">
      {/* <Header /> */}
      <Carousel />
      <div className="cinema__home__latest">
        <div className="container">
          <CartHeader name="Latest" />
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

export default Home;
