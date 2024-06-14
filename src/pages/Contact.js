import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/commons/Wrapper';
import contactIcons from '../assets/data/contactIcons';
import ContactInfo from '../components/ContactComponents/ContactInfo';
import ContactInputs from '../components/ContactComponents/ContactInputs';

function Contact() {
  return (
    <Wrapper>
      <div className="contact">
        <div className="container">
          <div className="contact__page">
            <ContactInfo />
            <h2 className="contact__page__message__title">If You Got Any Questions Olease Do Not Hesitate To Send Us a Meesage</h2>
            <ContactInputs />
            <button type="submit" className="orange__btn">Send Message</button>
            <h2 className="connect">Connect with us!</h2>
            <div className="contact__icons">
              {contactIcons.map((icon) => (
                <div key={icon.id} className="contact__icons__item">
                  <Link to={icon.url}>
                    <img src={icon.img} alt="icon" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Contact;
