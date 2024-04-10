import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="nav__link">
            <NavLink to="#">Home</NavLink>
            <NavLink to="#">Catalog</NavLink>
            <NavLink to="#">Contact Us</NavLink>
          </div>
          <div className="nav__button">
            <NavLink to="#">Sign In</NavLink>
            <NavLink className="orange__btn" to="#">Sign Up</NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
