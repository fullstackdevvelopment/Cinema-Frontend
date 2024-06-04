import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav__logo">
            <NavLink to="/home">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="nav__link">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/catalog">Catalog</NavLink>
            <NavLink to="/contactus">Contact Us</NavLink>
            {/* eslint-disable-next-line react/button-has-type */}
            <NavLink to="/buyTicket1"><button className="green__btn">Ticket</button></NavLink>
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
