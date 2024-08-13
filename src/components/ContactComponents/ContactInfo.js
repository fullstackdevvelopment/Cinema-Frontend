import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

function ContactInfo() {
  return (
    <div className="contact__page">
      <h2 className="contact__title">CONTACT US</h2>
      <div className="contact__info">
        <div className="contact__info__item">
          <figure>
            <FontAwesomeIcon icon={faPhoneVolume} />
          </figure>
          <h2 className="contact__info__item__title">Phone</h2>
          <NavLink to="tel:+37494558806">+37494558806</NavLink>
          <NavLink to="tel:031265563">031265563</NavLink>
        </div>
        <div className="contact__info__item">
          <figure>
            <FontAwesomeIcon icon={faLocationDot} />
          </figure>
          <h2 className="contact__info__item__title">Address</h2>
          <NavLink
            to="https://www.google.com/maps/search/?api=1&query=Techno-Educational Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__info__item__infos"
          >
            Techno-Educational Academy
          </NavLink>
        </div>
        <div className="contact__info__item">
          <figure>
            <FontAwesomeIcon icon={faEnvelope} />
          </figure>
          <h2 className="contact__info__item__title">Email</h2>
          <NavLink to="mailto:Fmovie.cineam@gmail.com">Fmovie.cineam@gmail.com</NavLink>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
