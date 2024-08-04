import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { resetPassword } from '../../store/actions/resetPassword';

function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [stage, setStage] = useState(false);

  const handleSubmit = useCallback(async () => {
    const result = await dispatch(resetPassword({ email }));
    if (resetPassword.fulfilled.match(result)) {
      setStage(true);
    } else if (result.error.message === 'Rejected') {
      setStatus({
        error: result.payload.errors.email,
      });
      console.log(status);
    }
  }, [dispatch, email, stage, status]);
  return (
    <div className="reset__password">
      {stage ? (
        <div className="container">
          <div className="reset__password__verify__block">
            <h1>Reset your password</h1>
            <p>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="reset__password__box">
            <h2 className="reset__password__title">RESET PASSWORD</h2>
            <div className="reset__password__p">
              <p className="reset__password__text">
                Enter your email address in the form bellow and we will
                send you further instructions on how to reset your password
              </p>
            </div>
            <div className="reset__password__input__div">
              <input
                type="text"
                className={status ? 'sign__in__input status' : 'sign__in__input'}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {status ? (
                <span className="reset__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {status.error}
                </span>
              ) : null}
            </div>
            <button onClick={handleSubmit} type="submit" className="orange__btn">
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
