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
import { Panel, PanelGroup, Drawer, Input, InputGroup, Stack } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageNextIcon from '@rsuite/icons/PageNext';
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
import { Col, Container, Form, Card } from 'react-bootstrap';

import { CustomNav } from '../../Components/Header/CustomNav';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';
import { H1 } from '../../Components/Helpers/index.style';
const styles = {
  width: 300,
  marginBottom: 10,
};

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
        <main className='w-100' style={{ minHeight: '815px' }}>
          <div className='margin-top-mobile' style={{ height: '100px' }}></div>
          <Panel
            className='mt-5 m-5 pb-4 bg-white border panelprofileuser'
            bordered
            header={
              <Stack justifyContent='space-between'>
                <H1 className='text-home'>Account Information</H1>
              </Stack>
            }
          >
            <img
              className='profimg rounded-circle mx-auto d-block'
              src={PUBLIC_PATH + 'images/' + user.prof_img}
              alt='profimg'
            />
            <Container bordered className='my-3 text-center'>
              <h5>
                {user ? user.user_details.first_name : ''}{' '}
                {user.user_details ? user.user_details.middle_name : ''}{' '}
                {user.user_details ? user.user_details.last_name : ''}{' '}
                {user.user_details ? user.user_details.ext_name : ''}
              </h5>
              {user ? user.email : ''}
            </Container>
            <Container className='d-flex flex-column mx-auto'>
              <div className='mobilechangeprof'>
                <InputGroup className='m-auto' style={styles}>
                  <Input
                    readOnly
                    value={
                      user.user_details ? user.user_details.contact_number : ''
                    }
                  />
                  <InputGroup.Button onClick={() => setOpenEditProfile(true)}>
                    <FaUserEdit className='me-2' />
                    Change
                  </InputGroup.Button>
                </InputGroup>
              </div>
              <div className='deskchangeprof mx-auto'>
                <InputGroup className='m-auto' style={styles}>
                  <Input
                    readOnly
                    value={
                      user.user_details ? user.user_details.contact_number : ''
                    }
                  />
                  <InputGroup.Button onClick={handleShow}>
                    <FaUserEdit className='me-2' />
                    Change{' '}
                  </InputGroup.Button>
                </InputGroup>
              </div>
              <div className=' mx-auto mt-3'>
                <InputGroup className='m-auto' style={styles}>
                  <InputGroup.Addon>Street </InputGroup.Addon>
                  <Input
                    readOnly
                    value={user.user_details ? user.user_details.street : ''}
                  />
                </InputGroup>
              </div>
              <div className=' mx-auto mt-3'>
                <InputGroup className='m-auto' style={styles}>
                  <InputGroup.Addon>Barangay </InputGroup.Addon>
                  <Input
                    readOnly
                    value={user.user_details ? user.user_details.barangay : ''}
                  />
                </InputGroup>
              </div>
              <div className=' mx-auto mt-3'>
                <InputGroup className='m-auto' style={styles}>
                  <InputGroup.Addon>City </InputGroup.Addon>
                  <Input
                    readOnly
                    value={user.user_details ? user.user_details.city : ''}
                  />
                </InputGroup>
              </div>
              <div className=' mx-auto mt-3'>
                <InputGroup className='m-auto' style={styles}>
                  <InputGroup.Addon>Province </InputGroup.Addon>
                  <Input
                    readOnly
                    value={user.user_details ? user.user_details.province : ''}
                  />
                </InputGroup>
              </div>
            </Container>
          </Panel>
          <Panel
            onClick={() => setOpenChangePassword(true)}
            className='mobilechangeprof m-4 bg-white border'
            bordered
            shaded
            header='Change Password '
          ></Panel>

          <form>
            <div className='row'>
              {/* <FaUserEdit size="0.7rem" /> &nbsp;
                      <a href="#" onClick={handleShow}>
                        Edit Profile
                      </a> */}

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
                            {user ? user.user_details.first_name : ''}{' '}
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
                            {user.user_details ? user.user_details.street : ''}
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
          </form>
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
                      {user ? user.user_details.first_name : ''}{' '}
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
