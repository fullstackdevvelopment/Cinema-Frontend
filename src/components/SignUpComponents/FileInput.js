import React, { useState } from 'react';

function FileInput(props) {
  const { setPhoto } = props;
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
        <>
          <label
            className="sign__up__input__file__label"
            htmlFor="sign__up__input__file"
          >
            <img
              className="sign__up__input__file__img"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
            />
          </label>
          <input
            placeholder="Photo"
            className="sign__up__input__file"
            type="file"
            id="sign__up__input__file"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <>
          <label
            className="sign__up__input__file__label"
            htmlFor="sign__up__input__file"
          >
            Photo
          </label>
          <input
            placeholder="Photo"
            className="sign__up__input__file"
            type="file"
            id="sign__up__input__file"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}

export default FileInput;
