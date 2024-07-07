import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { LiaPhoneVolumeSolid } from 'react-icons/lia';
import { CiLocationOn } from 'react-icons/ci';
import { TfiEmail } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';
import googlePlay from '../../assets/images/icons/google-play.png';
import appStore from '../../assets/images/icons/app-store.svg';
import instagram from '../../assets/images/icons/instagram.png';
import facebook from '../../assets/images/icons/facebook.png';
import chrome from '../../assets/images/icons/chrome.png';
import twitter from '../../assets/images/icons/twitter.png';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__block">
          <div className="footer__row">
            <div className="footer__logo">
              <p>F</p>
              <p>movie</p>
            </div>
          </div>
          <div className="footer__row">
            <div className="footer__menu">
              <div className="footer__menu__link">
                <h3>About</h3>
                <NavLink to="#">Home</NavLink>
                <NavLink to="#">Catalog</NavLink>
                <NavLink to="#">Profile</NavLink>
              </div>
              <div className="footer__menu__link">
                <h3>Menu</h3>
                <NavLink to="#">Latest</NavLink>
                <NavLink to="#">Coming Soon</NavLink>
                <NavLink to="#">Featured movies</NavLink>
              </div>
            </div>
          </div>
          <div className="footer__row">
            <div className="footer__contact">
              <div className="footer__contact__link">
                <h3>Contact Us</h3>
                <div className="footer__contact__link__content">
                  <CiLocationOn />
                  <NavLink to="#">Armenia Gyumri Gayi1 Street</NavLink>
                </div>
                <div className="footer__contact__link__content">
                  <LiaPhoneVolumeSolid />
                  <NavLink to="tel:+37494558806">+37494558806</NavLink>
                  <NavLink to="tel:031265563">031265563</NavLink>
                </div>
                <div className="footer__contact__link__content">
                  <TfiEmail />
                  <NavLink to="#">Fmovie.cineam@gmail.com</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__copy">
            <p>Copyright</p>
            <FaRegCopyright />
            <p>2023Fmovie. Cinema</p>
          </div>
          <div className="footer__menu__icon">
            <h3>Follow Us</h3>
            <div className="footer__menu__icon__block">
              <img src={facebook} alt="facebook" />
            </div>
            <div className="footer__menu__icon__block">
              <img src={instagram} alt="instagram" />
            </div>
            <div className="footer__menu__icon__block">
              <img src={twitter} alt="twitter" />
            </div>
            <div className="footer__menu__icon__block">
              <img src={chrome} alt="chrome" />
            </div>
          </div>
          <div className="footer__block__icon">
            <img src={googlePlay} alt="googlePlay" />
            <img src={appStore} alt="appStore" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
