import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Wrapper from '../components/commons/Wrapper';
import { emailVerification } from '../store/actions/emailVerification';

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = useCallback(async () => {
    setLoading(true);
    if (verificationCode) {
      const emailVerificationResult = await dispatch(emailVerification({ verificationCode }));
      if (emailVerification.fulfilled.match(emailVerificationResult)) {
        setLoading(false);
        toast.success('Your email has successfully passed verification and you have registered on the site', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/signIn');
        }, 2000);
      } else {
        setLoading(true);
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
            <span className="orange__btn" onClick={handleVerify}>
              {loading ? (
                <ClipLoader color="#fff" className="loading" />
              ) : ('Verify')}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Wrapper>
  );
}

export default Verification;
