import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import FileInput from '../components/SignUpComponents/FileInput';
import DataInput from '../components/SignUpComponents/DataInput';
import CardInput from '../components/SignUpComponents/CardInput';
import Wrapper from '../components/commons/Wrapper';
import { register } from '../store/actions/register';

function SignUp() {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleSubmit = useCallback((e) => {
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
    dispatch(register(formData));
  }, [dispatch, photo, firstName, lastName, userName, email,
    password, city, country, address, phone,
    cardNumber, selectedMonth, selectedYear, cvv,
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
                <FileInput setPhoto={setPhoto} />
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
                  city={city}
                  country={country}
                  address={address}
                  phone={phone}
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
                  setCvv={setCvv}
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
