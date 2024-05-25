import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/img.svg';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <nav className="nav">
          <figure className="nav__logo">
            <img src={logo} alt="logo" />
          </figure>
          <div className="nav__link">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/catalog">Catalog</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="#">Contact Us</NavLink>
              </li>
            </ul>
          </div>
          <div className="nav__button">
            <ul>
              <li>
                <NavLink to="#">Sign In</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/signUp" className="orange__btn">Sign Up</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
