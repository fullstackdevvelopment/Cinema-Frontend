import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

function DataInputSettings(props) {
  const {
    setFirstName,
    setLastName,
    setEmail,
    setCity,
    setCountry,
    setAddress,
    setPhone,
    firstName,
    lastName,
    email,
    city,
    country,
    address,
    phone,
    errors,
  } = props;

  const [disabledInputs, setDisabledInputs] = useState({
    firstName: true,
    lastName: true,
    email: true,
    city: true,
    country: true,
    address: true,
    phone: true,
  });

  const handleChange = useCallback((inputName) => {
    setDisabledInputs((prevState) => ({
      ...prevState,
      [inputName]: !prevState[inputName],
    }));
  }, []);

  const signUpInput = [
    {
      id: 1,
      name: 'firstName',
      placeholder: 'Firstname',
      type: 'text',
      onChange: (e) => setFirstName(e.target.value),
      value: firstName,
      error: errors?.firstName,
    },
    {
      id: 2,
      name: 'lastName',
      placeholder: 'Lastname',
      type: 'text',
      onChange: (e) => setLastName(e.target.value),
      value: lastName,
      error: errors?.lastName,
    },
    {
      id: 3,
      name: 'city',
      placeholder: 'City',
      type: 'text',
      onChange: (e) => setCity(e.target.value),
      value: city,
      error: errors?.city,
    },
    {
      id: 4,
      name: 'email',
      placeholder: 'Email',
      type: 'text',
      onChange: (e) => setEmail(e.target.value),
      value: email,
      error: errors?.email,
    },
    {
      id: 5,
      name: 'country',
      placeholder: 'Country',
      type: 'text',
      onChange: (e) => setCountry(e.target.value),
      value: country,
      error: errors?.country,
    },
    {
      id: 6,
      name: 'address',
      placeholder: 'Address',
      type: 'text',
      onChange: (e) => setAddress(e.target.value),
      value: address,
      error: errors?.address,
    },
    {
      id: 7,
      name: 'phone',
      placeholder: 'Phone',
      type: 'text',
      onChange: (e) => setPhone(e.target.value),
      value: phone,
      error: errors?.phone,
    },
  ];

  return (
    <div className="settings__form__data">
      {signUpInput.map((i) => (
        <label htmlFor={i.id} key={i.id}>
          <input
            id={i.id}
            placeholder={i.placeholder}
            className={`sign__up__input ${i.error ? 'error__input' : ''}`}
            type={i.type}
            onChange={i.onChange}
            value={i.value}
            disabled={disabledInputs[i.name]}
          />
          <FontAwesomeIcon
            className="pencil"
            icon={faPencil}
            onClick={() => handleChange(i.name)}
          />
          {errors && (
            i.error ? (
              <span className="register__error">
                <FontAwesomeIcon className="register__error__icon" icon={faTriangleExclamation} />
                {i.error}
              </span>
            ) : null
          )}
        </label>
      ))}
    </div>
  );
}

export default DataInputSettings;
