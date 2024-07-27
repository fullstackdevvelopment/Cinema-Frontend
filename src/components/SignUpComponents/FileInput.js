import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function FileInput(props) {
  const { setPhoto, errors } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhoto(file);
    }
  };

  return (
    <div className="sign__up__form__file">
      {selectedFile ? (
        <div className="sign__up__form__file__block">
          <div className="sign__up__form__file__block__img">
            <img
              className="sign__up__input__file__img"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
            />
          </div>
          <div className="sign__up__form__file__block__first">
            <label
              className="sign__up__input__file__label"
              htmlFor="sign__up__input__file"
            >
              Change Photo
            </label>
          </div>
          <div className="sign__up__form__file__block__second">
            <input
              placeholder="Photo"
              className="sign__up__input__file"
              type="file"
              id="sign__up__input__file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <div className="sign__up__form__file__block">
          <div className="sign__up__form__file__block__first">
            <label
              className="sign__up__input__file__label"
              htmlFor="sign__up__input__file"
            >
              Select Photo
            </label>
            {errors?.photo ? (
              <span className="register__error">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {errors?.photo}
              </span>
            ) : null}
          </div>
          <div className="sign__up__form__file__block__second">
            <input
              placeholder="Photo"
              className="sign__up__input__file"
              type="file"
              id="sign__up__input__file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FileInput;
