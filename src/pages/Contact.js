import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/commons/Wrapper';
import ContactInfo from '../components/ContactComponents/ContactInfo';
import facebook from '../assets/images/contactIcons/facebook.png';
import instagram from '../assets/images/contactIcons/instagram.png';
import twitter from '../assets/images/contactIcons/twitter.png';
import google from '../assets/images/contactIcons/google.png';

const contactIcons = [
  { id: 1, img: facebook, url: 'https://www.facebook.com/' },
  { id: 2, img: instagram, url: 'https://www.instagram.com/' },
  { id: 3, img: twitter, url: 'https://x.com/?mx=2' },
  { id: 4, img: google, url: 'https://google.com' },
];

function Contact() {
  return (
    <Wrapper>
      <div className="contact">
        <div className="container">
          <div className="contact__page">
            <ContactInfo />
            <h2 className="contact__page__message__title">If You Got Any Questions Please Do Not Hesitate To Send Us a Message</h2>
            <div className="contact__inputs">
              <textarea placeholder="Message" className="contact__inputs__message" />
            </div>
            <button type="submit" className="orange__btn contact__btn">Send Message</button>
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
            <div className="contact__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.2329960410625!2d43.84391263677059!3d40.78550942363254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041fbedb78169af%3A0x9688d481af79919a!2sTechno-Educational%20Academy!5e0!3m2!1sru!2sam!4v1720371639965!5m2!1sru!2sam"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen=""
                aria-hidden="false"
                title="Google Maps"
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Contact;
