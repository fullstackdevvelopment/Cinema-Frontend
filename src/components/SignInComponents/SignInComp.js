import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
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
  const [type, setType] = useState(false);
  const [typeIcon, setTypeIcon] = useState(faEye);
  const [loading, setLoading] = useState(false);

  const handleTypePassword = useCallback(() => {
    setType((prevType) => !prevType);
    setTypeIcon((prevTypeIcon) => (prevTypeIcon === faEye ? faEyeSlash : faEye));
  }, []);

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
      setLoading(true);

      if (signIn.rejected.match(signInResult)) {
        setLoading(false);
        if (signInResult.error.message === 'Rejected') {
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
                type={type ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon className="eye" icon={typeIcon} onClick={handleTypePassword} />
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
              <Link to="/reset/password" className="reset__title">Forgot Password?</Link>
            </div>
            <button type="submit" className="orange__btn">
              {loading ? (
                <ClipLoader color="#fff" className="loading" />
              ) : ('Sign In')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInComp;
