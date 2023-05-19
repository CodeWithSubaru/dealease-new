import useAuthContext from '../../Hooks/Context/AuthContext';
import Table from 'react-bootstrap/Table';
import { Footer } from '../../Components/Footer/Footer';
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import PUBLIC_PATH from '../../api/public_url';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBurger,
  faHamburger,
  faHouse,
  faSliders,
  faTable,
  faToggleOn,
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

  const [userProfile, setUserProfile] = useState(editUserDetails);

  return user ? (
    <>
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
                          style={{ cursor: 'pointer' }}
                          href='#'
                          onClick={handleShow}
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
                        <FaUserEdit size='0.7rem' /> &nbsp;
                        <a href='change-password'>Change</a>
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
