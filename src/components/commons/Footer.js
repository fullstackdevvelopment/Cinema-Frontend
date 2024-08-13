import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopyright,
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import googlePlay from '../../assets/images/icons/google-play.webp';
import appStore from '../../assets/images/icons/app-store.webp';
import instagram from '../../assets/images/icons/instagram.webp';
import facebook from '../../assets/images/icons/facebook.webp';
import chrome from '../../assets/images/icons/chrome.webp';
import twitter from '../../assets/images/icons/twitter.webp';

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
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/catalog">Catalog</NavLink>
                <NavLink to="/settings">Profile</NavLink>
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
                  <FontAwesomeIcon icon={faLocationDot} />
                  <NavLink
                    to="https://www.google.com/maps/search/?api=1&query=Techno-Educational Academy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Techno-Educational Academy
                  </NavLink>
                </div>
                <div className="footer__contact__link__content">
                  <FontAwesomeIcon icon={faPhoneVolume} />
                  <NavLink to="tel:+37494558806">+37494558806</NavLink>
                  <NavLink to="tel:031265563">031265563</NavLink>
                </div>
                <div className="footer__contact__link__content">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <NavLink to="mailto:Fmovie.cineam@gmail.com">Fmovie.cineam@gmail.com</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__copy">
            <p>Copyright</p>
            <FontAwesomeIcon icon={faCopyright} />
            <p>2023Fmovie. Cinema</p>
          </div>
          <div className="footer__menu__icon">
            <h3>Follow Us</h3>
            <Link target="_blank" to="https://www.facebook.com/technoeducationalacademy/" className="footer__menu__icon__block">
              <img src={facebook} alt="facebook" />
            </Link>
            <Link target="_blank" to="https://www.instagram.com/technoeducationalacademy/" className="footer__menu__icon__block">
              <img src={instagram} alt="instagram" />
            </Link>
            <Link target="_blank" to="https://x.com/technoedacademy" className="footer__menu__icon__block">
              <img src={twitter} alt="twitter" />
            </Link>
            <Link target="_blank" to="https://www.google.com/search?q=Techno-Educational+Academy&sca_esv=08a7c6c574dce941&sxsrf=ADLYWILvq83lQmBz3EoIlI_6OSfOzAzecQ%3A1722623224074&ei=-CStZqCmBI-akdUPvtCuoA4&ved=0ahUKEwiggunK99aHAxUPTaQEHT6oC-QQ4dUDCBA&uact=5&oq=Techno-Educational+Academy&gs_lp=Egxnd3Mtd2l6LXNlcnAiGlRlY2huby1FZHVjYXRpb25hbCBBY2FkZW15MgYQABgWGB4yCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIyE1QowpYyktwA3gAkAEAmAGbAqABjQiqAQUwLjUuMbgBA8gBAPgBAfgBApgCCaACnAjCAgcQIxiwAxgnwgIOEC4YgAQYsAMYxwEYrwHCAgsQABiABBiwAxiiBMICBBAjGCfCAgUQIRigAZgDAOIDBRIBMSBAiAYBkAYGkgcFMy41LjGgB4Ab&sclient=gws-wiz-serp" className="footer__menu__icon__block">
              <img src={chrome} alt="chrome" />
            </Link>
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
