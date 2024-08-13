import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Wrapper from '../components/commons/Wrapper';
import { resetPasswordFinished } from '../store/actions/resetPasswordFinished';

function ResetPassword() {
  const { verificationCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordStatus, setRepeatPasswordStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(false);
  const [typeIcon, setTypeIcon] = useState(faEye);
  const [typeTwo, setTypeTwo] = useState(false);
  const [typeIconTwo, setTypeIconTwo] = useState(faEye);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (repeatPassword === password) {
      const result = await dispatch(resetPasswordFinished({ verificationCode, password }));
      setLoading(true);
      if (resetPasswordFinished.fulfilled.match(result)) {
        setLoading(false);
        toast.success('Your password has been successfully changed', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/signIn');
        }, 3000);
      } else if (result.error.message === 'Rejected') {
        setLoading(true);
        setStatus({
          error: result.payload.errors.password,
        });
      }
      setRepeatPasswordStatus(null);
    } else {
      setRepeatPasswordStatus({
        error: 'Password mismatch',
      });
    }
  }, [dispatch, password, repeatPassword, verificationCode, status]);

  const handleTypePassword = useCallback(() => {
    setType((prevType) => !prevType);
    setTypeIcon((prevTypeIcon) => (prevTypeIcon === faEye ? faEyeSlash : faEye));
  }, []);

  const handleTypeRepeatPassword = useCallback(() => {
    setTypeTwo((prevTypeTwo) => !prevTypeTwo);
    setTypeIconTwo((prevTypeIconTwo) => (prevTypeIconTwo === faEye ? faEyeSlash : faEye));
  }, []);

  return (
    <Wrapper>
      <div className="reset__password__verify">
        <div className="container">
          <div className="reset__password__verify__block">
            <div className="reset__password__verify__block__content">
              <h1>Write a new password</h1>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="password">
                <input
                  id="password"
                  className="sign__in__input"
                  type={type ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <FontAwesomeIcon icon={typeIcon} onClick={handleTypePassword} />
              </label>
              {status ? (
                <span className="password__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {status.error}
                </span>
              ) : null}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="repeat__password">
                <input
                  id="repeat__password"
                  className="sign__in__input"
                  type={typeTwo ? 'text' : 'password'}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat Your New Password"
                />
                <FontAwesomeIcon icon={typeIconTwo} onClick={handleTypeRepeatPassword} />
              </label>
              {repeatPasswordStatus ? (
                <span className="password__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {repeatPasswordStatus.error}
                </span>
              ) : null}
              <button className="orange__btn" onClick={handleSubmit} type="submit">
                {loading ? (
                  <ClipLoader color="#fff" className="loading" />
                ) : ('Change Password')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Wrapper>
  );
}

export default ResetPassword;
