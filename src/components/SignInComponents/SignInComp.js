import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
  const [error, setError] = useState(null);
  console.log(error);
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError({});
    try {
      const signInResult = await dispatch(signIn({
        userName,
        password,
      }));

      if (signIn.rejected.match(signInResult)) {
        console.log(signInResult.payload);
        if (signInResult.payload.message === 'Not Found') {
          setError((prevErrors) => ({
            ...prevErrors,
            error: 'Username or Password is incorrect',
          }));
        }
        if (signInResult.payload.errors) {
          setError((prevErrors) => ({
            ...prevErrors,
            ...signInResult.payload.errors,
          }));
        }
      }
      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, userName, password]);

  return (
    <div className="signIn">
      <div className="container">
        <div className="signIn__box">
          <h2 className="signIn__title">SIGN IN</h2>
          <form onSubmit={handleSubmit} className="signIn__inputs">
            <label htmlFor="userName">
              <input
                id="userName"
                className="sign__in__input"
                placeholder="Username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
              {error?.userName ? (
                <span>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {error?.userName}
                </span>
              ) : null}
            </label>
            <label htmlFor="password">
              <input
                id="password"
                className="sign__in__input"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error?.password ? (
                <span>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {error?.password}
                </span>
              ) : null}
              {error?.error ? (
                <span>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {error?.error}
                </span>
              ) : null}
            </label>
            <div className="reset">
              <Link to="/reset" className="reset__title">Forgot Password?</Link>
            </div>
            <div>
              <h2 className="signIn__or">Or</h2>
            </div>
            <div className="software__icons">
              {signInData.map((icon) => (
                <div key={icon.id} className="software__icons__box">
                  <Link to={icon.url}>
                    <img
                      className="software__icons__img"
                      src={icon.image}
                      alt=""
                    />
                  </Link>
                </div>
              ))}
            </div>
            <button type="submit" className="orange__btn">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInComp;
