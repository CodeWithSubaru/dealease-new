import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import '../assets/scss/button.scss';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import PUBLIC_PATH from '../api/public_url';
import { EmailVerification } from '../Pages/Auth/EmailVerification';
import {
  Offcanvas,
  Form,
  Container,
  Button,
  Navbar,
  Nav,
  Row,
  Col,
  NavDropdown,
} from 'react-bootstrap';
import {
  faCartShopping,
  faCog,
  faPowerOff,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {
  MobileHeaderRider,
  NavbarUser,
} from '../Components/MobileHeader/MobileHeader';

export function AuthRiderLayout() {
  const { user, user_type, logout, token } = useAuthContext();

  if (!user.email_verified_at && token) {
    return <EmailVerification />;
  }

  const handleLogout = () => {
    logout();
  };
  const [activeKeyTop, setActiveKeyTop] = useState(null);

  const [activeKey, setActiveKey] = useState(null);
  const [show, setShowHelp] = useState(false);
  const helpClose = () => setShowHelp(false);
  const helpShow = () => setShowHelp(true);
  return (
    <>
      <Navbar bg='primary' variant='dark' sticky='top' className='UserNavbar'>
        <Container>
          <Navbar.Brand href='/'>
            <span className='fs-3 text-white fw-bold fst-italic'>
              <img
                alt=''
                src='/images/dealeasefavicon.png'
                width='40'
                height='40'
                className='d-inline-block align-top '
              />{' '}
              Dealease
            </span>
          </Navbar.Brand>
          <Nav>
            {/* <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
              </Form> */}

            <OverlayTrigger
              overlay={<Tooltip id='tooltip-disabled'>Wallet</Tooltip>}
              placement='bottom'
            >
              <button
                className='btn btn-outline-login me-2'
                onClick={() => setModalShow(true)}
              >
                <img
                  src='/images/seashell.png'
                  className='me-2 d-inline-block align-top'
                  width='25'
                  height='25'
                ></img>
                {user.wallet ? user.wallet.shell_coin_amount : null}
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={<Tooltip id='tooltip-disabled'>Settings</Tooltip>}
              placement='bottom'
            >
              <Nav.Link href='/settings'>
                <FontAwesomeIcon icon={faCog} className='navs-icon' />{' '}
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={<Tooltip id='tooltip-disabled'>Help</Tooltip>}
              placement='bottom'
            >
              <Nav.Link href='' onClick={helpShow}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className='navs-icon'
                />{' '}
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              overlay={<Tooltip id='tooltip-disabled'>Logout</Tooltip>}
              placement='bottom'
            >
              <Nav.Link className='navLinkCircle' onClick={handleLogout}>
                <FontAwesomeIcon icon={faPowerOff} className='navs-icon' />{' '}
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Container>
      </Navbar>
      <NavbarUser
        // appearance='subtle'
        activeKeyTop={activeKeyTop}
        onSelectTop={setActiveKeyTop}
      />
      <MobileHeaderRider
        className=' w-100'
        appearance='subtle'
        reversed
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <Offcanvas show={show} onHide={helpClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      {user_type === 'Rider' ? <Outlet /> : <Navigate to='/rider/login' />}
    </>
  );
}
