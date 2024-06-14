import React from 'react';
import contact from '../../assets/data/contact';

function ContactInfo() {
  return (
    <div className="contact__page">
      <h2 className="contact__title">CONTACT US</h2>
      <div className="contact__info">
        {contact.map((contactInfo) => (
          <div key={contactInfo.id} className="contact__info__item">
            <img className="contact__info__item__icon" src={contactInfo.img} alt="" />
            <h2 className="contact__info__item__title">{contactInfo.title}</h2>
            <h2 className="contact__info__item__infos">{contactInfo.info}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;
