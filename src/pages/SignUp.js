import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import FileInput from '../components/SignUpComponents/FileInput';
import DataInput from '../components/SignUpComponents/DataInput';
import Wrapper from '../components/commons/Wrapper';
import { register } from '../store/actions/register';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+374');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (phone === '+374' || city === '' || address === '' || country === '') {
      formData.append('photo', photo);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('password', password);
    } else {
      formData.append('photo', photo);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('city', city);
      formData.append('country', country);
      formData.append('address', address);
      formData.append('phone', phone);
    }
    try {
      const newErrors = {};

      if (repeatPassword !== password) {
        newErrors.repeatPassword = 'Password mismatch';
      }
      if (photo === null) {
        newErrors.photo = 'Add Photo';
      }
      const signUpResult = await dispatch(register(formData));

      if (register.fulfilled.match(signUpResult)) {
        setLoading(false);
        navigate('/email/verification');
      } else if (signUpResult.error.message === 'Rejected') {
        setLoading(false);
        const apiErrors = signUpResult.payload.errors;
        setErrors({
          ...apiErrors,
          ...newErrors,
        });
      } else {
        setErrors(newErrors);
      }
      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, photo, firstName, lastName, userName, email,
    password, city, country, address, phone]);
  return (
    <Wrapper>
      <div className="sign__up">
        <div className="container">
          <div className="sign__up__page">
            <div className="sign__up__title">
              <h1>Sign Up</h1>
            </div>
            <div className="sign__up__instruction">
              <p>Fill in all Fields</p>
              <p>
                <FontAwesomeIcon icon={faStarOfLife} />
                -
                (Required)
              </p>
            </div>
            <div className="sign__up__form">
              <form id="signUp" onSubmit={handleSubmit}>
                <FileInput setPhoto={setPhoto} errors={errors} />
                <DataInput
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setUserName={setUserName}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setCity={setCity}
                  setCountry={setCountry}
                  setAddress={setAddress}
                  setPhone={setPhone}
                  firstName={firstName}
                  lastName={lastName}
                  userName={userName}
                  email={email}
                  password={password}
                  setRepeatPassword={setRepeatPassword}
                  city={city}
                  country={country}
                  address={address}
                  phone={phone}
                  errors={errors}
                />
                <div className="sign__up__btn">
                  <button className="orange__btn" type="submit" form="signUp">
                    {loading ? (
                      <ClipLoader color="#fff" className="loading" />
                    ) : ('Done')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SignUp;
