import React from 'react';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
        <nav className="cinema__nav">
            <NavLink to="/home" className="cinema__nav__item">
                Home
            </NavLink>
            <NavLink to="/catalog" className="cinema__nav__item">
                Catalog
            </NavLink>
            <NavLink to="/contact-us" className="cinema__nav__item">
                Contact Us
            </NavLink>
        </nav>
    );
}

export default Navigation;
