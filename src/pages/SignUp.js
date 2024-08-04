import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileInput from '../components/SignUpComponents/FileInput';
import DataInput from '../components/SignUpComponents/DataInput';
import Wrapper from '../components/commons/Wrapper';
import { register } from '../store/actions/register';
import CardInput from '../components/SignUpComponents/CardInput';

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
  const [cardNumber, setCardNumber] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData();
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
    formData.append('cardNumber', cardNumber);
    formData.append('selectedMonth', selectedMonth);
    formData.append('selectedYear', selectedYear);
    formData.append('cvv', cvv);
    formData.append('cardHolderName', cardHolderName);
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
        navigate('/email/verification');
      } else if (signUpResult.error.message === 'Rejected') {
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
    password, city, country, address, phone, cardNumber,
    selectedMonth,
    selectedYear,
    cvv,
    cardHolderName]);
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
                <CardInput
                  cardNumber={cardNumber}
                  setCardNumber={setCardNumber}
                  cardHolderName={cardHolderName}
                  setCardHolderName={setCardHolderName}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  setSelectedMonth={setSelectedMonth}
                  setSelectedYear={setSelectedYear}
                  cvv={cvv}
                  setCvv={setCvv}
                  errors={errors}
                />
                <div className="sign__up__btn">
                  <button className="orange__btn" type="submit" form="signUp">Done</button>
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
