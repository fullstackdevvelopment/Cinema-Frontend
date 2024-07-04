import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not__found__section">
      <p>404</p>
      <div>Sorry!!! The page you are looking for is not found</div>
      <NavLink className="green__btn" to="/home">Back to Home</NavLink>
    </div>
  );
}
// not__found__go__home
export default NotFound;
