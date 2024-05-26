import React from 'react';

function ResetPassword() {
  return (
    <div className="reset__password">
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
            <input type="text" className="sign__in__input" />
          </div>
          <button type="submit" className="orange__btn">Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
