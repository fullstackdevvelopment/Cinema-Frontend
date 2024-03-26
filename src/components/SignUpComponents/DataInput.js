import React from 'react';

function DataInput() {
  return (
    <div className="sign__up__form__data">
      <input placeholder="Username" className="sign__up__input" type="text" />
      <input placeholder="City" className="sign__up__input" type="text" />
      <input placeholder="Email" className="sign__up__input" type="text" />
      <input placeholder="Country" className="sign__up__input" type="text" />
      <input placeholder="Password" className="sign__up__input" type="text" />
      <input placeholder="Adress" className="sign__up__input" type="text" />
      <input placeholder="Repeat Password" className="sign__up__input" type="text" />
      <input placeholder="Phone" className="sign__up__input" type="text" />
    </div>
  );
}

export default DataInput;
