import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signInData from '../../assets/data/signInData/signInData';
import { signIn } from '../../store/actions/signIn';

function SignInComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.signIn.user);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { token } = userData || {};
  const userToken = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/home');
      window.location.reload();
      sessionStorage.setItem('token', token);
    }
    if (userToken) {
      navigate('/home');
      window.location.reload();
    }
  }, [token, userToken]);

  const handleSubmit = useCallback(() => {
    dispatch(signIn({
      userName,
      password,
    }));
  }, [userName, password]);
  return (
    <div className="signIn">
      <div className="container">
        <div className="signIn__box">
          <h2 className="signIn__title">SIGN IN</h2>
          <div className="signIn__inputs">
            <input
              className="signIn__input"
              placeholder="Username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
            {' '}
            <br />
            <input
              className="signIn__input"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
          <button onClick={handleSubmit} type="submit" className="orange__btn">Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default SignInComp;
