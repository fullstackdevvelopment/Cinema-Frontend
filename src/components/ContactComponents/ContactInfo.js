import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { LiaPhoneVolumeSolid } from 'react-icons/lia';
import { TfiEmail } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';

function ContactInfo() {
  return (
    <div className="contact__page">
      <h2 className="contact__title">CONTACT US</h2>
      <div className="contact__info">
        <div className="contact__info__item">
          <figure>
            <LiaPhoneVolumeSolid />
          </figure>
          <h2 className="contact__info__item__title">Phone</h2>
          <NavLink to="tel:+37494558806">+37494558806</NavLink>
          <NavLink to="tel:031265563">031265563</NavLink>
        </div>
        <div className="contact__info__item">
          <figure>
            <CiLocationOn />
          </figure>
          <h2 className="contact__info__item__title">Address</h2>
          <p className="contact__info__item__infos">
            Armenia Gyumri
            Gayi1 Street
          </p>
        </div>
        <div className="contact__info__item">
          <figure>
            <TfiEmail />
          </figure>
          <h2 className="contact__info__item__title">Email</h2>
          <h2 className="contact__info__item__infos">Fmovie.cineam@gmail.com</h2>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
