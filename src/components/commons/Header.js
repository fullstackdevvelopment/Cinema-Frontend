import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import vector from '../../assets/images/icons/vector.svg';
import userError from '../../assets/images/icons/userError.webp';
import logOut from '../../assets/images/icons/logout.png';
import { userData } from '../../store/actions/userData';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.data.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setAnchorEl(null);
    navigate('/signIn');
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      dispatch(userData(token));
    }
  }, [dispatch, token]);

  return (
    <div className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav__logo">
            <NavLink to="/home">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="nav__link">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/catalog">Catalog</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/buyTicket1">
              <button type="submit" className="green__btn">Ticket</button>
            </NavLink>
          </div>
          <div className="nav__button">
            {token ? (
              <div className="header__nav__icon">
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <img
                    src={`http://localhost:4000/${user?.photo}`}
                    alt="user"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = userError;
                    }}
                  />
                  <img src={vector} alt="vector" />
                </Button>
              </div>
            ) : (
              <>
                <NavLink to="/signin">Sign In</NavLink>
                <NavLink className="orange__btn" to="/signup">Sign Up</NavLink>
              </>
            )}
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {token ? [
                <MenuItem>
                  <img
                    src={`http://localhost:4000/${user?.photo}`}
                    alt="user"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = userError;
                    }}
                  />
                  <div>
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                    <p>{user?.email}</p>
                  </div>
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  <img src={logOut} alt="logout" />
                  <p>Sign Out</p>
                </MenuItem>,
                <MenuItem key="settings" onClick={() => navigate('/settings')}>
                  <FontAwesomeIcon icon={faGear} />
                  <p>Settings</p>
                </MenuItem>,
              ] : (
                <MenuItem key="signin" onClick={() => navigate('/signIn')}>Sign In</MenuItem>
              )}
            </Menu>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
