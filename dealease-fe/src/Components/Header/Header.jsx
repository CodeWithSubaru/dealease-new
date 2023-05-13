import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Offcanvas,
  Form,
  Container,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Link } from 'react-router-dom';
// import '../../assets/scss/header.scss';
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

  const [headernew, setHeader] = useState('header');

  const listenScrollEvent = (event) => {
    if (window.scrollY < 0.5) {
      return setHeader('header');
    } else if (window.scrollY > 0.5) {
      return setHeader('header2');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      {/* {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => ( */}
      {['lg'].map((expand) => (
        <Navbar
          className={headernew}
          key={expand}
          // bg='transparent'
          variant='dark'
          expand={expand}
          sticky='top'
        >
          <Container>
            {/* <Navbar.Brand href='#'>
              <img
                alt=''
                src='/images/dealeasefavicon.png'
                width='40'
                height='40'
                className='d-inline-block align-top'
              />{' '}
              <span className='fs-3'>Dealease</span>
            </Navbar.Brand> */}
            <Nav className='me-auto'>
              <span className='fs-3 text-white fw-bold fst-italic'>
                <img
                  alt=''
                  src='/images/dealeasefavicon.png'
                  width='40'
                  height='40'
                  className='d-inline-block align-top'
                />{' '}
                Dealease
              </span>
            </Nav>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    alt=''
                    src='/images/dealeasefavicon.png'
                    width='40'
                    height='40'
                    className='d-inline-block align-top'
                  />{' '}
                  <span className='fs-1 fw-bold fst-italic'>Dealease</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='offCanvas'>
                <Nav className='justify-content-end flex-grow-1 pe-4'>
                  <Nav.Link className='navLink' href='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link className='navLink' href='#announcement'>
                    Announcement
                  </Nav.Link>
                  <Nav.Link className='navLink' href='#products'>
                    Products
                  </Nav.Link>
                  <NavDropdown
                    title='Dropdown'
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                    <NavDropdown.Item href='#action4'>
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action5'>
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <MydModalWithGrid
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <button
                  className='btn btn-outline btn-sm text-decoration-none border border-2 border-light me-3'
                  // className='login-button'
                  onClick={() => setModalShow(true)}
                  role={Button}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className='navs-icon me-2 '
                  />
                  Login
                </button>
                <button
                  // className='signup-button'
                  onClick={() => setRegisterModalShow(true)}
                  role={Button}
                  className='btn btn-dark btn-sm text-decoration-none border border-2 border-dark me-3'
                >
                  Signup
                </button>
                <RegisterModal
                  showRegister={modalRegisterShow}
                  onHideRegister={() => setRegisterModalShow(false)}
                />
                {/* <Form className='d-flex'>
                  <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2'
                    aria-label='Search'
                  />
                  <button className='btn  btn-dark '>Search</button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {/* <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' onClick={closeMobileMenu}>
            <div className='img-contain '>
              <img src=''></img>
            </div>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faXmark : faBars} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {!token ? (
              <>
                <li className='nav-item '>
                  <Link
                    to='/'
                    className='nav-links fs-2'
                    onClick={closeMobileMenu}
                  >
                    Dealease
                  </Link>
                </li>
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
      </nav> */}
    </>
  );
}

export default Header;
