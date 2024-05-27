import React from 'react';
import Header from '../components/commons/Header';
import CartHeader from '../components/HomeComponent/CartHeader';
import Cart from '../components/HomeComponent/Cart';
import Carousel from '../components/HomeComponent/Carousel';

function Home() {
  return (
    <div className="cinema__home">
      <Header />
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

      <div className="cinema__home__latest">
        <div className="container">
          <CartHeader name="Coming soon" />
          <div className="cinema__home__latest__row">
            <Cart />
            <Cart />
            <Cart />
          </div>
        </div>
      </div>

      <div className="cinema__home__latest">
        <div className="container">
          <CartHeader name="Featured movies" />
          <div className="cinema__home__latest__row">
            <Cart />
            <Cart />
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
