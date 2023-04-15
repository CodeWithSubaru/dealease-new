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
import { H3 } from '../../Components/Helpers/index.style';
import { Login } from '../../Pages/Auth/Login';
import { LoginSeller } from '../../Pages/Auth/LoginSeller';
import { MydModalWithGrid } from '../Modal/Signupmoda';
import { RegisterModal } from '../Modal/RegisterModal';

export function Test() {
  return (
    <>
      <div className='vr' />
    </>
  );
}

// patrick

export function Header(props) {
  // collapsible navlinks
  const { user, token } = useAuthContext();

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
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener('resize', showButton);
  const [modalShow, setModalShow] = useState(false);
  const [modalRegisterShow, setRegisterModalShow] = useState(false);
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <div className='img-contain'>
            <img src='/images/dealeaselogo.png' className='logo'></img>
          </div>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {!token ? (
            <>
              <li className='nav-item'>
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
              <li className='d-flex align-items-center mb-1'>
                <Link
                  to='/register-exist'
                  className='signup-button p-2'
                  role={Button}
                >
                  Sign up Exist
                </Link>
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
{
  /* <PrimaryBtnStyle
                  backgroundColor="#efa726"
                  hoverBgColor="#d69215"
                  navigateTo="/login"
                  btnTitle="Login"
                  link
                />
                <PrimaryBtnStyle
                  backgroundColor="#efa726"
                  hoverBgColor="#d69215"
                  navigateTo="/seller/login"
                  btnTitle="LoginSeller"
                  link
                />
                <PrimaryBtnStyle
                  backgroundColor="#efa726"
                  hoverBgColor="#d69215"
                  navigateTo="/admin/login"
                  btnTitle="LoginAdmin"
                  link
                />
                <SecondaryBtnStyle
                  backgroundColor="transparent"
                  hoverBgColor="#d69215"
                  navigateTo="/register"
                  btnTitle="Sign Up"
                  link
                />

                <SecondaryBtnStyle
                  backgroundColor="transparent"
                  hoverBgColor="#d69215"
                  navigateTo="/register-exist"
                  btnTitle="Sign Up with exisitng account"
                  link
                /> */
}
