import React from 'react';
import Navigation from './Navigation';
import Login from './Login';
import logo from '../../assets/images/img.svg';

function Header() {
  return (
    <header className="cinema__header">
      <div className="container">
        <div className="row">
          <figure className="cinema__header__figure">
            <img src={logo} alt="logo" className="cinema__header__figure__logo" />
          </figure>
          <Navigation />
          <Login />
        </div>

      </div>
    </header>
  );
}

export default Header;
