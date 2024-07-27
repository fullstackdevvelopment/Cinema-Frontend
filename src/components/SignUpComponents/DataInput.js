import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function DataInput(props) {
  const {
    setFirstName,
    setLastName,
    setUserName,
    setEmail,
    setPassword,
    setRepeatPassword,
    setCity,
    setCountry,
    setAddress,
    setPhone,
    firstName,
    lastName,
    userName,
    email,
    password,
    repeatPassword,
    city,
    country,
    address,
    phone,
    errors,
  } = props;

  const signUpInput = [
    {
      id: 1,
      placeholder: 'Firstname',
      type: 'text',
      onChange: (e) => setFirstName(e.target.value),
      value: firstName,
      error: errors?.firstName,
    },
    {
      id: 2,
      placeholder: 'Lastname',
      type: 'text',
      onChange: (e) => setLastName(e.target.value),
      value: lastName,
      error: errors?.lastName,
    },
    {
      id: 3,
      placeholder: 'Username',
      type: 'text',
      onChange: (e) => setUserName(e.target.value),
      value: userName,
      error: errors?.userName,
    },
    {
      id: 4,
      placeholder: 'City',
      type: 'text',
      onChange: (e) => setCity(e.target.value),
      value: city,
      error: errors?.city,
    },
    {
      id: 5,
      placeholder: 'Email',
      type: 'text',
      onChange: (e) => setEmail(e.target.value),
      value: email,
      error: errors?.email,
    },
    {
      id: 6,
      placeholder: 'Country',
      type: 'text',
      onChange: (e) => setCountry(e.target.value),
      value: country,
      error: errors?.country,
    },
    {
      id: 7,
      placeholder: 'Password',
      type: 'password',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      error: errors?.password,
    },
    {
      id: 8,
      placeholder: 'Address',
      type: 'text',
      onChange: (e) => setAddress(e.target.value),
      value: address,
      error: errors?.address,
    },
    {
      id: 9,
      placeholder: 'Repeat Password',
      type: 'password',
      onChange: (e) => setRepeatPassword(e.target.value),
      value: repeatPassword,
      error: errors?.repeatPassword,
    },
    {
      id: 10,
      placeholder: 'Phone',
      type: 'text',
      onChange: (e) => setPhone(e.target.value),
      value: phone,
      error: errors?.phone,
    },
  ];

  return (
    <div className="sign__up__form__data">
      {signUpInput.map((i) => (
        <label htmlFor={i.id} key={i.id}>
          {i.error ? (
            <input
              id={i.id}
              placeholder={i.placeholder}
              className="sign__up__input error__input"
              type={i.type}
              onChange={i.onChange}
              value={i.value}
            />
          ) : (
            <input
              id={i.id}
              placeholder={i.placeholder}
              className="sign__up__input"
              type={i.type}
              onChange={i.onChange}
              value={i.value}
            />
          )}
          {errors && (
            i.error ? (
              <span className="register__error">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {i.error}
              </span>
            ) : (
              <span className="register__ok">
                <FontAwesomeIcon icon={faCheck} />
                Everything is written correctly
              </span>
            )
          )}
        </label>
      ))}
    </div>
  );
}

export default DataInput;
