import React from 'react';
import { Link } from 'react-router-dom';
import signInData from '../../assets/data/signInData/signInData';

function SignInComp() {
  return (
    <div className="signIn">
      <div className="container">
        <div className="signIn__box">
          <h2 className="signIn__title">SIGN IN</h2>
          <div className="signIn__inputs">
            <input className="signIn__input" placeholder="Username" type="text" />
            {' '}
            <br />
            <input className="signIn__input" placeholder="Password" type="password" />
            {' '}
            <br />
            <Link to="/reset" className="reset__title">Forgot Password?</Link>
          </div>
          {' '}
          <br />
          <h2 className="signIn__or">Or</h2>
          <div className="software__icons">
            {signInData.map((icon) => (
              <div key={icon.id} className="software__icons__box">
                <Link to={icon.url}><img className="software__icons__img" src={icon.image} alt="" /></Link>
              </div>
            ))}
          </div>
          <button type="submit" className="orange__btn">Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default SignInComp;
