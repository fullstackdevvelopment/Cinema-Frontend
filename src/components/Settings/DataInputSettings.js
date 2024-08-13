import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faEyeSlash,
  faLock, faLockOpen, faPencil,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';

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
    setCurrentPassword,
    setNewPassword,
    setRepeatNewPassword,
    currentPassword,
    newPassword,
    repeatNewPassword,
    errors,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [signUpInput, setSignUpInput] = useState([]);
  const [type, setType] = useState(false);
  const [typeIcon, setTypeIcon] = useState(faEye);
  const [typeTwo, setTypeTwo] = useState(false);
  const [typeIconTwo, setTypeIconTwo] = useState(faEye);
  const [typeThree, setTypeThree] = useState(false);
  const [typeIconThree, setTypeIconThree] = useState(faEye);

  const handleTypeCurrentPassword = useCallback(() => {
    setType((prevType) => !prevType);
    setTypeIcon((prevTypeIcon) => (prevTypeIcon === faEye ? faEyeSlash : faEye));
  }, []);

  const handleTypeNewPassword = useCallback(() => {
    setTypeTwo((prevTypeTwo) => !prevTypeTwo);
    setTypeIconTwo((prevTypeIconTwo) => (prevTypeIconTwo === faEye ? faEyeSlash : faEye));
  }, []);

  const handleTypeNewRepeatPassword = useCallback(() => {
    setTypeThree((prevTypeThree) => !prevTypeThree);
    setTypeIconThree((prevTypeIconThree) => (prevTypeIconThree === faEye ? faEyeSlash : faEye));
  }, []);

  useEffect(() => {
    setSignUpInput([
      {
        id: 1,
        name: 'firstName',
        placeholder: 'Firstname',
        type: 'text',
        onChange: (e) => setFirstName(e.target.value),
        value: firstName,
        error: errors?.firstName,
        disabled: !isEditing,
      },
      {
        id: 2,
        name: 'lastName',
        placeholder: 'Lastname',
        type: 'text',
        onChange: (e) => setLastName(e.target.value),
        value: lastName,
        error: errors?.lastName,
        disabled: !isEditing,
      },
      {
        id: 3,
        name: 'city',
        placeholder: 'City',
        type: 'text',
        onChange: (e) => setCity(e.target.value),
        value: city,
        error: errors?.city,
        disabled: !isEditing,
      },
      {
        id: 4,
        name: 'email',
        placeholder: 'Email',
        type: 'text',
        onChange: (e) => setEmail(e.target.value),
        value: email,
        error: errors?.email,
        disabled: true,
      },
      {
        id: 5,
        name: 'country',
        placeholder: 'Country',
        type: 'text',
        onChange: (e) => setCountry(e.target.value),
        value: country,
        error: errors?.country,
        disabled: !isEditing,
      },
      {
        id: 6,
        name: 'address',
        placeholder: 'Address',
        type: 'text',
        onChange: (e) => setAddress(e.target.value),
        value: address,
        error: errors?.address,
        disabled: !isEditing,
      },
      {
        id: 7,
        name: 'phone',
        placeholder: 'Phone',
        type: 'text',
        onChange: (e) => setPhone(e.target.value),
        value: phone,
        error: errors?.phone,
        disabled: !isEditing,
      },
      {
        id: 8,
        name: 'current password',
        placeholder: 'Current Password',
        type: type ? 'text' : 'password',
        icon: typeIcon,
        handleType: handleTypeCurrentPassword,
        onChange: (e) => setCurrentPassword(e.target.value),
        value: currentPassword,
        error: errors?.currentPassword,
        disabled: !isEditing,
      },
      {
        id: 9,
        name: 'new password',
        placeholder: 'New Password',
        type: typeTwo ? 'text' : 'password',
        icon: typeIconTwo,
        handleType: handleTypeNewPassword,
        onChange: (e) => setNewPassword(e.target.value),
        value: newPassword,
        error: errors?.newPassword,
        disabled: !isEditing,
      },
      {
        id: 10,
        name: 'repeat new password',
        placeholder: 'Repeat New Password',
        type: typeThree ? 'text' : 'password',
        icon: typeIconThree,
        handleType: handleTypeNewRepeatPassword,
        onChange: (e) => setRepeatNewPassword(e.target.value),
        value: repeatNewPassword,
        error: errors?.repeatNewPassword,
        disabled: !isEditing,
      },
    ]);
  }, [errors, firstName, lastName, email, city, country, address, phone, currentPassword, newPassword, repeatNewPassword, isEditing,
    type,
    typeIcon,
    typeTwo,
    typeIconTwo,
    typeThree,
    typeIconThree]);
  const handleChange = useCallback(() => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setSignUpInput((prevInputs) => prevInputs.map((input) => ({
      ...input,
      disabled: input.name === 'email' ? true : !isEditing,
    })));
  }, [isEditing]);

  return (
    <>
      <div className="profile__page__change">
        <Button onClick={handleChange}>
          Change Details
          <FontAwesomeIcon
            className="pencil"
            icon={faPencil}
          />
        </Button>
      </div>
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
              disabled={i.disabled}
              autoComplete="new-password"
            />
            {i.icon && (
              <FontAwesomeIcon
                icon={i.icon}
                onClick={i.handleType}
                className="password__toggle__icon"
              />
            )}
            {i.disabled ? (
              <FontAwesomeIcon
                className="lock"
                icon={faLock}
              />
            ) : (
              <FontAwesomeIcon
                className="lock"
                icon={faLockOpen}
              />
            )}
            {i.error && (
              <span className="register__error">
                <FontAwesomeIcon className="register__error__icon" icon={faTriangleExclamation} />
                {i.error}
              </span>
            )}
          </label>
        ))}
      </div>
    </>
  );
}

export default DataInputSettings;
