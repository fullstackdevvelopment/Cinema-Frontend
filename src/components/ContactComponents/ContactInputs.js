import React from 'react';
import contactInput from '../../assets/data/contactInput';

function ContactInputs() {
  return (
    <div className="contact__page">
      <div className="contact__inputs">
        <div className="contact__inputs__input">
          {contactInput.map((input) => (
            <div key={input.id} className="contact__inputs__input__item">
              <input
                className="contact__inputs__input__item__input"
                placeholder={input.placeholder}
                type="text"
              />
            </div>
          ))}
        </div>
        <textarea placeholder="Message" className="contact__inputs__message" />
      </div>
    </div>
  );
}

export default ContactInputs;
