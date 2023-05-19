import useAuthContext from '../../Hooks/Context/AuthContext';
import Table from 'react-bootstrap/Table';
import { Footer } from '../../Components/Footer/Footer';
import { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import PUBLIC_PATH from '../../api/public_url';
import { NavbarUserProfile } from '../../Components/MobileHeader/MobileHeader';
import { Panel, PanelGroup, Drawer, Placeholder, Avatar } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBurger,
  faHamburger,
  faHouse,
  faSliders,
  faTable,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Col, Container, Form } from 'react-bootstrap';

import { CustomNav } from '../../Components/Header/CustomNav';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';

export const ProfileUser = () => {
  const [activeKeyTop, setActiveKeyTop] = useState(null);
  const { user, fetchUserInfo } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeKey, setActiveKey] = useState(null);
  const [errors, setErrors] = useState([]);

  const editUserDetails = {
    // first_name: '',
    // middle_name: '',
    // last_name: '',
    // ext_name: '',
    // street: '',
    // barangay: '',
    // city: '',
    contact_number: user.user_details.contact_number,
  };
  // const [errors, setErrors] = useState({});

  const [userProfile, setUserProfile] = useState(editUserDetails);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const [password, setPassword] = useState({});
  const { logout } = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post('/change-password', password)
      .then((res) => {
        if (res.status === 200) {
          Notification({
            title: 'Success',
            message:
              'Your password has been changed. You will be redirected to home page',
            icon: 'success',
          }).then(() => {
            logout();
          });
        }
        setErrors([]);
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(e.response.data.errors));
      });
  };

  useEffect(() => {
    setErrors([]);
  }, []);
  return user ? (
    <>
      <NavbarUserProfile
        // appearance='subtle'
        activeKeyTop={activeKeyTop}
        onSelectTop={setActiveKeyTop}
      />
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarUser />
        <main
          className='w-100 bg-white m-3 mt-5 p-2 shadow'
          style={{ minHeight: '815px' }}
        >
          <div className='userprofile'>
            <form>
              <div className='row'>
                <div className='col  pt-5'>
                  <h5 className=''>Account Information</h5>
                  <img
                    className=' w-50 h-25 text-center rounded'
                    src={PUBLIC_PATH + 'images/' + user.prof_img}
                    alt='profimg'
                  />

                  {/* <FaUserEdit size="0.7rem" /> &nbsp;
                      <a href="#" onClick={handleShow}>
                        Edit Profile
                      </a> */}
                  <Container>
                    <Row>
                      <Col xs={3}>Full Name:</Col>
                      <Col xs={5}>
                        {/* <InputGroup size="sm" className="mb-3">
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Small
                          </InputGroup.Text>
                          <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </InputGroup> */}
                        {user ? user.first_name : ''}{' '}
                        {user.user_details ? user.user_details.middle_name : ''}{' '}
                        {user.user_details ? user.user_details.last_name : ''}{' '}
                        {user.user_details ? user.user_details.ext_name : ''}
                      </Col>
                      <Col
                        xs={3}
                        style={{
                          color: '#0c6ffd',
                        }}
                      >
                        {/* <FaUserEdit size='0.7rem' /> &nbsp; Change */}
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col xs={3}>Email:</Col>
                      <Col xs={5}>{user ? user.email : ''} </Col>
                      <Col
                        xs={2}
                        style={{
                          color: '#0c6ffd',
                        }}
                      >
                        {/* <FaUserEdit size='0.7rem' /> &nbsp; Change */}
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col xs={3}>Phone:</Col>
                      <Col xs={5}>
                        {user.user_details
                          ? user.user_details.contact_number
                          : ''}
                      </Col>
                      <Col
                        xs={2}
                        style={{
                          color: '#0c6ffd',
                        }}
                      >
                        <a
                          className='mobilechangeprof'
                          style={{ cursor: 'pointer' }}
                          // href='#'
                          // onClick={handleShow}
                          onClick={() => setOpenEditProfile(true)}
                        >
                          {' '}
                          <FaUserEdit size='0.7rem' /> &nbsp; Change
                        </a>
                        <a
                          style={{ cursor: 'pointer' }}
                          href='#'
                          onClick={handleShow}
                          className='deskchangeprof'
                        >
                          {' '}
                          <FaUserEdit size='0.7rem' /> &nbsp; Change
                        </a>
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col xs={3}>Password:</Col>
                      <Col
                        xs={5}
                        style={{
                          color: '#0c6ffd',
                        }}
                      >
                        <a
                          onClick={() => setOpenChangePassword(true)}
                          className='mobilechangeprof'
                        >
                          <FaUserEdit size='0.7rem' /> &nbsp; Change
                        </a>
                        <a href='/change-password' className='deskchangeprof'>
                          <FaUserEdit size='0.7rem' /> &nbsp; Change
                        </a>
                      </Col>
                    </Row>
                  </Container>
                  <div className='modalprof'>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Table striped>
                          <tbody>
                            <tr>
                              <td>Full Name</td>
                              <td>
                                {user ? user.first_name : ''}{' '}
                                {user ? user.middle_name : ''}{' '}
                                {user ? user.last_name : ''}{' '}
                                {user ? user.ext_name : ''}
                              </td>
                            </tr>

                            <tr>
                              <td>Email</td>
                              <td>{user ? user.email : ''} </td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>
                                {user.user_details
                                  ? user.user_details.street
                                  : ''}
                                {user.user_details
                                  ? user.user_details.barangay
                                  : ''}
                              </td>
                            </tr>

                            <tr>
                              <td>Birthday </td>
                              <td>
                                {user.user_details
                                  ? user.user_details.birth_date
                                  : ''}
                              </td>
                            </tr>

                            <tr>
                              <td>Contact Number</td>
                              <td>
                                <Form
                                  id='editProfile'
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    axiosClient
                                      .put('/edit-profile', userProfile)
                                      .then((res) => {
                                        setErrors([]);
                                        handleClose();
                                        fetchUserInfo();
                                        Notification({
                                          title: 'Success',
                                          message: res.data.status,
                                          icon: 'success',
                                        })
                                          .catch((err) =>
                                            Notification({
                                              title: 'Error',
                                              message: 'Something went wrong',
                                              icon: 'error',
                                            })
                                          )
                                          .then(() =>
                                            setErrors(err.response.data.errors)
                                          );
                                      })
                                      .catch((err) =>
                                        setErrors(err.response.data.errors)
                                      );
                                  }}
                                >
                                  <Form.Group>
                                    <Form.Control
                                      type='text'
                                      onChange={(e) =>
                                        setUserProfile({
                                          ...userProfile,
                                          contact_number: e.target.value,
                                        })
                                      }
                                      value={userProfile.contact_number}
                                      isInvalid={
                                        !!errors && !!errors.contact_number
                                      }
                                    />
                                    {errors.contact_number ? (
                                      <Form.Control.Feedback type='invalid'>
                                        {errors.contact_number[0]}
                                      </Form.Control.Feedback>
                                    ) : (
                                      ''
                                    )}
                                  </Form.Group>
                                </Form>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant='danger'
                          className='rounded'
                          onClick={handleClose}
                        >
                          Close
                        </Button>
                        <Button
                          className='scbutton rounded'
                          type='submit'
                          form='editProfile'
                        >
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Drawer
        // size='full'
        style={{ width: '100%' }}
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-center'>Edit Profile</Drawer.Title>
          <Drawer.Actions>
            {/* <Button onClick={() => setOpenProfile(false)}>Cancel</Button>
            <Button onClick={() => setOpenProfile(false)} appearance='primary'>
              Confirm
            </Button> */}
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body className='panelGroupSettings'>
          <PanelGroup accordion defaultActiveKey={1} bordered>
            <Panel shaded header='Profile' eventKey={1} id='panel1'>
              <img
                className='mx-auto mb-4 d-block rounded-circle'
                style={{ height: '100px', width: '100px' }}
                src={PUBLIC_PATH + 'images/' + user.prof_img}
                alt=''
              />

              <Table striped>
                <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>
                      {user ? user.first_name : ''}{' '}
                      {user ? user.middle_name : ''}{' '}
                      {user ? user.last_name : ''} {user ? user.ext_name : ''}
                    </td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>{user ? user.email : ''} </td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>
                      {user.user_details ? user.user_details.street : ''}
                      {user.user_details ? user.user_details.barangay : ''}
                    </td>
                  </tr>

                  <tr>
                    <td>Birthday </td>
                    <td>
                      {user.user_details ? user.user_details.birth_date : ''}
                    </td>
                  </tr>

                  <tr>
                    <td>Contact Number</td>
                    <td>
                      <Form
                        id='editProfile'
                        onSubmit={(e) => {
                          e.preventDefault();
                          axiosClient
                            .put('/edit-profile', userProfile)
                            .then((res) => {
                              setErrors([]);
                              handleClose();
                              fetchUserInfo();
                              Notification({
                                title: 'Success',
                                message: res.data.status,
                                icon: 'success',
                              })
                                .catch((err) =>
                                  Notification({
                                    title: 'Error',
                                    message: 'Something went wrong',
                                    icon: 'error',
                                  })
                                )
                                .then(() =>
                                  setErrors(err.response.data.errors)
                                );
                            })
                            .catch((err) =>
                              setErrors(err.response.data.errors)
                            );
                        }}
                      >
                        <Form.Group>
                          <Form.Control
                            type='text'
                            onChange={(e) =>
                              setUserProfile({
                                ...userProfile,
                                contact_number: e.target.value,
                              })
                            }
                            value={userProfile.contact_number}
                            isInvalid={!!errors && !!errors.contact_number}
                          />
                          {errors.contact_number ? (
                            <Form.Control.Feedback type='invalid'>
                              {errors.contact_number[0]}
                            </Form.Control.Feedback>
                          ) : (
                            ''
                          )}
                        </Form.Group>
                      </Form>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className='scbutton rounded'
                type='submit'
                form='editProfile'
              >
                Save
              </Button>
            </Panel>
          </PanelGroup>
        </Drawer.Body>
      </Drawer>
      {/* changepassword */}
      <Drawer
        // size='full'
        style={{ width: '100%' }}
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-center'>Change Password</Drawer.Title>
          <Drawer.Actions>
            {/* <Button onClick={() => setOpenProfile(false)}>Cancel</Button>
            <Button onClick={() => setOpenProfile(false)} appearance='primary'>
              Confirm
            </Button> */}
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body className='panelGroupSettings'>
          <PanelGroup accordion defaultActiveKey={1} bordered>
            <Panel shaded header='Password' eventKey={1} id='panel1'>
              {/* <img
                className='mx-auto d-block rounded-circle'
                style={{ height: '100px', width: '100px' }}
                src={PUBLIC_PATH + 'images/' + user.prof_img}
                alt=''
              /> */}
              <form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Label
                    className='text-black'
                    style={{ marginLeft: '5px' }}
                  >
                    Old Password
                  </Form.Label>
                  &nbsp;<span className='text-danger'>*</span>
                  <Form.Control
                    style={{ margin: '0px 10px 0px  5px', width: '95%' }}
                    type='password'
                    placeholder='Enter Old Password'
                    onChange={(e) =>
                      setPassword({ ...password, old_password: e.target.value })
                    }
                    isInvalid={!!errors && !!errors.old_password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.old_password &&
                      errors.old_password.length > 0 &&
                      errors.old_password[0]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label
                    className='text-black'
                    style={{ marginLeft: '5px' }}
                  >
                    New Password
                  </Form.Label>
                  &nbsp;<span className='text-danger'>*</span>
                  <Form.Control
                    style={{ margin: '0px 10px 0px 5px', width: '95%' }}
                    type='password'
                    placeholder='Enter New Password'
                    onChange={(e) =>
                      setPassword({ ...password, new_password: e.target.value })
                    }
                    isInvalid={!!errors && !!errors.new_password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.new_password &&
                      errors.new_password.length > 0 &&
                      errors.new_password[0]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label
                    className='text-black'
                    style={{ marginLeft: '5px' }}
                  >
                    Confirm Password
                  </Form.Label>
                  &nbsp;
                  <span className='text-danger'>*</span>
                  <Form.Control
                    style={{ margin: '0px 10px 0px  5px', width: '95%' }}
                    type='password'
                    placeholder='Re-Enter Confirm Password'
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        new_password_confirmation: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <button
                  className='btn btn-primary w-30 rounded'
                  style={{ marginBottom: '10px', marginLeft: '5px' }}
                >
                  Submit
                </button>
              </form>
            </Panel>
          </PanelGroup>
        </Drawer.Body>
      </Drawer>
    </>
  ) : (
    <p>Loading...</p>
  );
};

function NavUser() {
  const [active, setActive] = useState('home');

  return (
    <CustomNav
      appearance='subtle'
      reversed
      active={active}
      onSelect={setActive}
    />
  );
}
