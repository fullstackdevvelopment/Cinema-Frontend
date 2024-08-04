import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function FileInputSettings(props) {
  const {
    selectedFile, setSelectedFile, setPhoto, errors, photo,
  } = props;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhoto(file);
    }
  };

  return (
    <div className="settings__form__file">
      {selectedFile ? (
        <div className="settings__form__file__block">
          <div className="settings__form__file__block__first">
            <div className="settings__form__file__block__img">
              <img
                className="settings__input__file__img"
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className="settings__input__file__label"
                htmlFor="settings__input__file"
              >
                <FontAwesomeIcon icon={faPencil} />
              </label>
            </div>
            <div className="settings__form__file__block__second">
              <input
                placeholder="Photo"
                className="settings__input__file"
                type="file"
                id="settings__input__file"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="settings__form__file__block">
          <div className="settings__form__file__block__first">
            <div className="settings__form__file__block__img">
              <img
                className="settings__input__file__img"
                src={`http://localhost:4000/${photo}`}
                alt="Selected"
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className="settings__input__file__label"
                htmlFor="settings__input__file"
              >
                <FontAwesomeIcon icon={faPencil} />
              </label>
              {errors?.photo ? (
                <span className="register__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.photo}
                </span>
              ) : null}
            </div>
          </div>
          <div className="settings__form__file__block__second">
            <input
              placeholder="Photo"
              className="settings__input__file"
              type="file"
              id="settings__input__file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FileInputSettings;
