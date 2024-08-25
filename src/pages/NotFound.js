import React from 'react';
import { NavLink } from 'react-router-dom';
import gif from '../assets/images/gif/404.gif';

function NotFound() {
  return (
    <div className="not__found__section">
      <div className="not__found__section__block">
        <img src={gif} alt="404" />
        <p>Sorry!!! The page you are looking for is not found</p>
        <NavLink className="green__btn" to="/home">Back to Home</NavLink>
      </div>
    </div>
  );
}

export default NotFound;
