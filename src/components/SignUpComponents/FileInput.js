import React, { useState } from 'react';

function FileInput() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="sign__up__form__file">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
      {selectedFile && (
        <img
          className="sign__up__input__file__img"
          src={selectedFile}
          alt="Selected"
        />
      )}
    </div>
  );
}

export default FileInput;
