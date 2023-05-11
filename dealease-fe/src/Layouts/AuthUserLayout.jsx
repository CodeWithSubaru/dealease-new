import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import {
  Offcanvas,
  Form,
  Container,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import useAuthContext from '../Hooks/Context/AuthContext';
import PUBLIC_PATH from '../api/public_url';
import '../assets/scss/button.scss';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { EmailVerification } from '../Pages/Auth/EmailVerification';
import useAddToCartContext from '../Hooks/Context/AddToCartContext';
import {
  faCartShopping,
  faCog,
  faCogs,
  faPowerOff,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// import { GoogleAdSense } from '../Components/GoogleAdSense';

export function AuthUserLayout() {
  const { user, token, user_type, logout } = useAuthContext();
  const { countItemsInCart, fetchCountInItemsCart } = useAddToCartContext();

  const closeMobileMenu = () => setClick(false);
  const handleLogout = () => {
    logout();
  };

  if (!user.email_verified_at && token) {
    return <EmailVerification />;
  }

  useEffect(() => {
    fetchCountInItemsCart();
  }, []);

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
              <span className='fs-3 text-white'>
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
                  <span className='fs-3'>Dealease</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='offCanvas'>
                <Nav className='justify-content-center flex-grow-1 pe-4'>
                  <Nav.Link className='navLink' href='#'>
                    Home
                  </Nav.Link>
                  <Nav.Link className='navLink' href='/transactions'>
                    Transactions
                  </Nav.Link>
                  <Nav.Link className='navLink' href='/orders'>
                    Orders
                  </Nav.Link>
                  <Nav.Link className='navLink' href='/orders/seller'>
                    Orders(Seller)
                  </Nav.Link>
                  <OverlayTrigger
                    overlay={<Tooltip id='tooltip-disabled'>Cart</Tooltip>}
                    placement='bottom'
                  >
                    <Nav.Link href='/add-to-cart'>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className='navs-icon'
                      />{' '}
                      <span
                        className='badge rounded-pill text-bg-danger position-relative'
                        style={{ top: '-5px' }}
                      >
                        {countItemsInCart === 9 ? '9+' : countItemsInCart}
                      </span>
                    </Nav.Link>
                  </OverlayTrigger>
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
                  {/* <div className='outer'>
                      <div className='inner'></div>
                    </div> */}
                  <OverlayTrigger
                    overlay={<Tooltip id='tooltip-disabled'>Wallet</Tooltip>}
                    placement='bottom'
                  >
                    <button className='btn btn-outline-login me-2'>
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
                    <Nav.Link href='/help'>
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
                {/* <MydModalWithGrid
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <button
                  className='btn btn-outline-login me-3'
                  onClick={() => setModalShow(true)}
                  role={Button}
                >
                  Login
                </button>
                <button
                  onClick={() => setRegisterModalShow(true)}
                  role={Button}
                  className='btn btn-light me-3'
                >
                  Signup
                </button>
                <RegisterModal
                  showRegister={modalRegisterShow}
                  onHideRegister={() => setRegisterModalShow(false)}
                /> */}
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
      {user_type === 'User' ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
}
