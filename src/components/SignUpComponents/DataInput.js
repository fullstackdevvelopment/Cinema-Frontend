import React from 'react';

function DataInput(props) {
  const {
    setFirstName,
    setLastName,
    setUserName,
    setEmail,
    setPassword,
    setCity,
    setCountry,
    setAddress,
    setPhone,
    firstName,
    lastName,
    userName,
    email,
    password,
    city,
    country,
    address,
    phone,
  } = props;
  const signUpInput = [
    {
      id: 1,
      placeholder: 'Firstname',
      type: 'text',
      onChange: (e) => setFirstName(e.target.value),
      value: firstName,
    },
    {
      id: 2,
      placeholder: 'Lastname',
      type: 'text',
      onChange: (e) => setLastName(e.target.value),
      value: lastName,
    },
    {
      id: 3,
      placeholder: 'Username',
      type: 'text',
      onChange: (e) => setUserName(e.target.value),
      value: userName,
    },
    {
      id: 4,
      placeholder: 'City',
      type: 'text',
      onChange: (e) => setCity(e.target.value),
      value: city,
    },
    {
      id: 5,
      placeholder: 'Email',
      type: 'text',
      onChange: (e) => setEmail(e.target.value),
      value: email,
    },
    {
      id: 6,
      placeholder: 'Country',
      type: 'text',
      onChange: (e) => setCountry(e.target.value),
      value: country,
    },
    {
      id: 7,
      placeholder: 'Password',
      type: 'password',
      onChange: (e) => setPassword(e.target.value),
      value: password,
    },
    {
      id: 8,
      placeholder: 'Address',
      type: 'text',
      onChange: (e) => setAddress(e.target.value),
      value: address,
    },
    {
      id: 9,
      placeholder: 'Repeat Password',
      type: 'password',
      onChange: () => {},
    },
    {
      id: 10,
      placeholder: 'Phone',
      type: 'text',
      onChange: (e) => setPhone(e.target.value),
      value: phone,
    },
  ];

  return (
    <div className="sign__up__form__data">
      {signUpInput.map((i) => (
        <input
          key={i.id}
          placeholder={i.placeholder}
          className="sign__up__input"
          type={i.type}
          onChange={i.onChange}
          value={i.value}
        />
      ))}
    </div>
  );
}

export default DataInput;
