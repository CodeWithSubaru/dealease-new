import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';
import PUBLIC_PATH from '../../api/public_url';
import { Footer } from '../../Components/Footer/Footer';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Offcanvas,
  Modal,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faQuestionCircle,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export function EmailVerification() {
  const [show, setShowHelp] = useState(false);

  const helpClose = () => setShowHelp(false);
  const helpShow = () => setShowHelp(true);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    axiosClient.get('/email/resend').then((res) => setMessage(res.data.msg));
  }

  const handleLogout = () => {
    logout();
  };

  if (user.email_verified_at && token) {
    navigate('/home');
  }

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar
          // className={headernew}
          key={expand}
          bg='primary'
          variant='dark'
          expand={expand}
          sticky='top'
        >
          <Container fluid>
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
              height='100%'
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
                <Nav className='justify-content-center flex-grow-1 pe-4'>
                  {/* <NavDropdown
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
                  </NavDropdown> */}
                </Nav>
                <Nav>
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
                      <FontAwesomeIcon
                        icon={faPowerOff}
                        className='navs-icon'
                      />{' '}
                    </Nav.Link>
                  </OverlayTrigger>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {/* <Header>
        <li className='nav-item'>
          <Link to='/transactions' className='nav-links'>
            Transactions
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/orders' className='nav-links'>
            Orders
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/orders/seller' className='nav-links'>
            Orders (Seller)
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/add-to-cart' className='nav-links'>
            <FontAwesomeIcon icon={faCartShopping} className='navs-icon' />{' '}
            <span
              className='badge rounded-pill text-bg-danger position-relative'
              style={{ top: '-5px' }}
            >
              {countItemsInCart === 9 ? '9+' : countItemsInCart}
            </span>
          </Link>
        </li>
        <div className='outer'>
          <div className='inner'></div>
        </div>
        <li className='nav-item'>
          <p className='nav-links'>
            <img
              src='/images/seashell.png'
              className='me-2'
              style={{ height: '30px' }}
            ></img>
            {user.wallet ? user.wallet.shell_coin_amount : null}
          </p>
        </li>
        <li className='nav-item'>
          <div className='div-dropdown me-3'>
            {user ? (
              <>
                <Dropdown as={ButtonGroup} className='dropdown-button'>
                  <Button variant='dark' className='dropdown-logout'>
                    <img
                      className='dropdown-logout-profile me-2'
                      src={PUBLIC_PATH + 'images/' + user.prof_img}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'fit',
                      }}
                    />{' '}
                    {user.first_name}
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant='dark'
                    id='dropdown-split-basic'
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={'/profile'}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/change-password'}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <p>Loading ...</p>
            )}
          </div>
        </li>
      </Header> */}

      <Offcanvas show={show} onHide={helpClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      {/* <Header className='header2' /> */}
      {/* <div className='bg-primary forgot-password-header'></div> */}
      <div>
        <Container>
          <Card className='verify-card-email'>
            {message && (
              <div
                className='text-center fadeInDown alert alert-primary text-capitalize'
                role='alert'
              >
                {message}
              </div>
            )}
            <FontAwesomeIcon icon={faEnvelope} style={{ height: '150px' }} />
            <h1 className='text-center'>Verify your email</h1>
            <p className='verify-card-p text-center fs-5'>
              {' '}
              Please verify your email before logging in. We've sent your email
              verification to your account.
            </p>{' '}
            <div className='text-center fs-2 mt-5'>
              Didn't receive Email?{' '}
              <Form onSubmit={handleSubmit} className=''>
                <Button veriant='primary' type='submit'>
                  Resend
                </Button>
              </Form>
            </div>
          </Card>
        </Container>
      </div>
      <div className='contacts-footer bg-dark text-white'>
        <Container fluid>
          <Row>
            <Col md={3} className='mb-5'>
              <span className='fs-3 fw-bold fst-italic text-white'>
                <img
                  alt=''
                  src='/images/dealeasefavicon.png'
                  width='40'
                  height='40'
                  className='d-inline-block align-top'
                />{' '}
                Dealease
              </span>
            </Col>
            <Col md={3} className='mb-5'>
              {/* <span className='fs-3 fw-bold fst-italic text-white'>
                <img
                  alt=''
                  src='/images/dti.png'
                  width='180'
                  height='180'
                  className='d-inline-block align-top'
                />
              </span> */}
            </Col>
            <Col className='pb-5'>
              <Row>
                <Col>
                  <h5>Service</h5>
                  <div className=''>
                    <a href='' className='text-decoration-none'>
                      Business
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Personal
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      FAQs
                    </a>
                  </div>
                </Col>
                <Col>
                  <h5>Company</h5>
                  <div className=''>
                    <a href='' className='text-decoration-none'>
                      About us
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Deliver Care
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Contact us
                    </a>
                  </div>
                </Col>
                <Col>
                  <h5>Legal</h5>
                  <div className=''>
                    <a href='' className='text-decoration-none'>
                      Privacy Policy
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Cookie Policy
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Terms and Condition
                    </a>
                  </div>
                </Col>
              </Row>
              <div className='d-flex justify-content-end mt-5'>
                <h5 className='my-auto me-5'>Follow us on </h5>
                <a href='https://www.facebook.com/'>
                  <img
                    alt=''
                    src='/images/socmed/fblogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
                <a href='https://www.instagram.com/'>
                  <img
                    alt=''
                    src='/images/socmed/instagramlogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
                <a href='https://www.youtube.com/'>
                  <img
                    alt=''
                    src='/images/socmed/youtubelogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
                <a href='https://www.linkedin.com/'>
                  <img
                    alt=''
                    src='/images/socmed/linkedinlogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
