import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFishFins,
  faHouse,
  faInfoCircle,
  faSignInAlt,
  faVolumeHigh,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Link } from 'react-router-dom';
import '../../assets/scss/header.scss';
import '../../assets/scss/global.scss';
import { MydModalWithGrid } from '../Modal/Signupmoda';
import { RegisterModal } from '../Modal/RegisterModal';

export function Header(props) {
  const {
    user,
    token,
    modalShow,
    setModalShow,
    isRegistrationSuccess,
    setRegistrationSuccess,
  } = useAuthContext();

  // Solla
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const [modalRegisterShow, setRegisterModalShow] = useState(false);

  useEffect(() => {
    showButton();

    if (isRegistrationSuccess) {
      setModalShow(true);
    }
  }, []);
  window.addEventListener('resize', showButton);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <div className='img-contain '>
            <img src='/images/dealeaselogo.png' className='logo'></img>
          </div>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {!token ? (
            <>
              <li className='nav-item '>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faHouse} className='navs-icon' />
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <a
                  href='home#announcement'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className='navs-icon slant'
                  />
                  Announcement
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='/home#products'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <FontAwesomeIcon icon={faFishFins} className='navs-icon' />
                  Products
                </a>
              </li>
              <li className='nav-item'>
                <MydModalWithGrid
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <div className='button-div mt-2'>
                  <button
                    className='signup-button'
                    onClick={() => setRegisterModalShow(true)}
                    role={Button}
                  >
                    Signup
                  </button>
                  <RegisterModal
                    showRegister={modalRegisterShow}
                    onHideRegister={() => setRegisterModalShow(false)}
                  />
                  <button
                    className='login-button'
                    onClick={() => setModalShow(true)}
                    role={Button}
                  >
                    Login
                  </button>
                </div>
              </li>
            </>
          ) : (
            props.children
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
