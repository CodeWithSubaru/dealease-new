import { Navigate, Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import '../assets/scss/button.scss';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import PUBLIC_PATH from '../api/public_url';
import {
  Offcanvas,
  Form,
  Container,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
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
export function AuthAdminLayout() {
  const { user, user_type, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

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
                  <Nav.Link className='navLink' href='/admin/dashboard'>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link className='navLink' href='/admin/users'>
                    Users
                  </Nav.Link>
                  <Nav.Link className='navLink' href='/admin/transactions'>
                    Transactions
                  </Nav.Link>
                  <Nav.Link className='navLink' href='/admin/announcement'>
                    Announcement
                  </Nav.Link>

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
      {/* <Header> */}
      {/* Modified Solla */}
      {/* <li className='nav-item'>
          <Link to='/admin/dashboard' className='nav-links'>
            Dashboard
          </Link>
        </li>
        {user_type === 'Admin' && (
          <>
            <li className='nav-item'>
              <Link to='/admin/users' className='nav-links'>
                Users
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/admin/transactions' className='nav-links'>
                Transactions
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/admin/announcement' className='nav-links'>
                Announcement
              </Link>
            </li>

            <li className='nav-item'>
              <div className='div-dropdown'>
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
                    <Dropdown.Item as={Link} to={'/admin/profile'}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/admin/change-password'}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          </>
        )}
      </Header> */}
      {user_type === 'Admin' ? <Outlet /> : <Navigate to='/admin/login' />}
    </>
  );
}
