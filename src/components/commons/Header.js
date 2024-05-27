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
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/catalog">Catalog</NavLink>
            <NavLink to="/contactus">Contact Us</NavLink>
          </div>
          <div className="nav__button">
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink className="orange__btn" to="/signup">Sign Up</NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
