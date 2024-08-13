import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEye,
  faEyeSlash, faStarOfLife,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

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

  const [type, setType] = useState(false);
  const [typeIcon, setTypeIcon] = useState(faEye);
  const [typeTwo, setTypeTwo] = useState(false);
  const [typeIconTwo, setTypeIconTwo] = useState(faEye);

  const handleTypePassword = useCallback(() => {
    setType((prevType) => !prevType);
    setTypeIcon((prevTypeIcon) => (prevTypeIcon === faEye ? faEyeSlash : faEye));
  }, []);

  const handleTypeRepeatPassword = useCallback(() => {
    setTypeTwo((prevTypeTwo) => !prevTypeTwo);
    setTypeIconTwo((prevTypeIconTwo) => (prevTypeIconTwo === faEye ? faEyeSlash : faEye));
  }, []);

  const signUpInput = [
    {
      id: 1,
      placeholder: 'Firstname',
      type: 'text',
      onChange: (e) => setFirstName(e.target.value),
      value: firstName,
      error: errors?.firstName,
      required: true,
    },
    {
      id: 2,
      placeholder: 'Lastname',
      type: 'text',
      onChange: (e) => setLastName(e.target.value),
      value: lastName,
      error: errors?.lastName,
      required: true,
    },
    {
      id: 3,
      placeholder: 'Username',
      type: 'text',
      onChange: (e) => setUserName(e.target.value),
      value: userName,
      error: errors?.userName,
      required: true,
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
      required: true,
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
      type: type ? 'text' : 'password',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      error: errors?.password,
      icon: typeIcon,
      handleType: handleTypePassword,
      required: true,
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
      type: typeTwo ? 'text' : 'password',
      onChange: (e) => setRepeatPassword(e.target.value),
      value: repeatPassword,
      error: errors?.repeatPassword,
      icon: typeIconTwo,
      handleType: handleTypeRepeatPassword,
      required: true,
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
          <input
            id={i.id}
            placeholder={i.placeholder}
            className={`sign__up__input ${i.error ? 'error__input' : ''}`}
            type={i.type}
            onChange={i.onChange}
            value={i.value}
            autoComplete="new-password"
          />
          {i.required ? (
            <FontAwesomeIcon
              icon={faStarOfLife}
              className="required__icon"
            />
          ) : null}
          {i.icon ? (
            <FontAwesomeIcon
              icon={i.icon}
              onClick={i.handleType}
              className="password__toggle__icon"
            />
          ) : null}
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
