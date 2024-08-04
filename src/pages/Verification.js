import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Wrapper from '../components/commons/Wrapper';
import { emailVerification } from '../store/actions/emailVerification';

function Verification() {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = useCallback(async () => {
    if (verificationCode) {
      const emailVerificationResult = await dispatch(emailVerification({ verificationCode }));
      if (emailVerification.fulfilled.match(emailVerificationResult)) {
        toast.success('Your email has successfully passed verification and you have registered on the site', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Error', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [dispatch, verificationCode]);
  return (
    <Wrapper>
      <div className="verification">
        <div className="container">
          <div className="verification__block">
            <h1>Email Verification</h1>
            <p>Write here the verification code that we sent to you by email</p>
            <input
              className="sign__in__input"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              type="text"
              placeholder="Your Verification code"
            />
            <span className="orange__btn" onClick={handleVerify}>Verify</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Wrapper>
  );
}

export default Verification;
