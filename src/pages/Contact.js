import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Wrapper from '../components/commons/Wrapper';
import ContactInfo from '../components/ContactComponents/ContactInfo';
import facebook from '../assets/images/contactIcons/facebook.png';
import instagram from '../assets/images/contactIcons/instagram.png';
// eslint-disable-next-line import/no-extraneous-dependencies
import twitter from '../assets/images/contactIcons/twitter.png';
import google from '../assets/images/contactIcons/google.png';
import { userData } from '../store/actions/userData';
import { sendMessage } from '../store/actions/sendMessage';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

const contactIcons = [
  { id: 1, img: facebook, url: 'https://www.facebook.com/technoeducationalacademy/' },
  { id: 2, img: instagram, url: 'https://www.instagram.com/technoeducationalacademy/' },
  { id: 3, img: twitter, url: 'https://x.com/technoedacademy' },
  { id: 4, img: google, url: 'https://www.google.com/search?q=Techno-Educational+Academy&sca_esv=08a7c6c574dce941&sxsrf=ADLYWILvq83lQmBz3EoIlI_6OSfOzAzecQ%3A1722623224074&ei=-CStZqCmBI-akdUPvtCuoA4&ved=0ahUKEwiggunK99aHAxUPTaQEHT6oC-QQ4dUDCBA&uact=5&oq=Techno-Educational+Academy&gs_lp=Egxnd3Mtd2l6LXNlcnAiGlRlY2huby1FZHVjYXRpb25hbCBBY2FkZW15MgYQABgWGB4yCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIyE1QowpYyktwA3gAkAEAmAGbAqABjQiqAQUwLjUuMbgBA8gBAPgBAfgBApgCCaACnAjCAgcQIxiwAxgnwgIOEC4YgAQYsAMYxwEYrwHCAgsQABiABBiwAxiiBMICBBAjGCfCAgUQIRigAZgDAOIDBRIBMSBAiAYBkAYGkgcFMy41LjGgB4Ab&sclient=gws-wiz-serp' },
];

function Contact() {
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.data.user);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(userData(token));
    }
  }, [dispatch, token]);

  const handleSend = useCallback(async () => {
    try {
      setLoading(true);
      const data = {
        email: email || user?.email,
        message,
      };
      const sendMessageResult = await dispatch(sendMessage(data));
      if (sendMessage.fulfilled.match(sendMessageResult)) {
        setLoading(false);
        toast.success('Your message has been sent successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setMessage('');
        setEmail('');
      } else {
        setError({
          error: sendMessageResult.payload.errors.message,
        });
        toast.error('Message was not sent', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [email, message, dispatch, user]);
  return (
    <Wrapper>
      <div className="contact">
        <div className="container">
          <div className="contact__page">
            <ContactInfo />
            <h2 className="contact__page__message__title">If You Got Any Questions Please Do Not Hesitate To Send Us a Message</h2>
            <div className="contact__inputs">
              {!token ? (
                <input
                  type="text"
                  placeholder="Your Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : null}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className={error ? 'contact__inputs__message error' : 'contact__inputs__message'}
                rows={8}
              />
              {error ? (
                <span>{error.error}</span>
              ) : null}
            </div>
            <button
              type="submit"
              className="orange__btn contact__btn"
              onClick={handleSend}
            >
              {loading ? (
                <ClipLoader color="#fff" className="loading" />
              ) : ('Send Message')}
            </button>
            <h2 className="connect">Connect with us!</h2>
            <div className="contact__icons">
              {contactIcons.map((icon) => (
                <div key={icon.id} className="contact__icons__item">
                  <Link to={icon.url} target="_blank">
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
      <ToastContainer />
    </Wrapper>
  );
}

export default Contact;
