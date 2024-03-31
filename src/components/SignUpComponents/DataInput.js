import React from 'react';
import signUpInput from '../../assets/data/signUp';

function DataInput() {
  return (
    <div className="sign__up__form__data">
      {signUpInput.map((i) => (
        <input key={i.id} placeholder={i.placeholder} className="sign__up__input" type={i.type} />
      ))}
    </div>
  );
}

export default DataInput;
