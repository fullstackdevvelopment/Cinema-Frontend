import React, { useCallback, useState } from 'react';
import Wrapper from '../components/commons/Wrapper';
import FileInput from '../components/SignUpComponents/FileInput';
import DataInput from '../components/SignUpComponents/DataInput';

function Settings() {
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
  }, [photo, firstName, lastName, userName, email,
    password, city, country, address, phone,
  ]);
  return (
    <Wrapper>
      <div className="profile">
        <div className="container">
          <div className="profile__page">
            <p>Profile</p>
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
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Settings;
