import useAuthContext from '../../Hooks/Context/AuthContext';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Footer } from '../../Components/Footer/footer';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUserEdit } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import PUBLIC_URL from '../../api/public_url';

export const ProfileAdmin = () => {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return user ? (
    <>
      <div className='userprofile'>
        <Card className='mx-auto w-75' style={{ height: '85vh' }}>
          <Card className='m-auto p-4 '>
            <div className='d-flex justify-content-between align-items-center mb-4 py-4 px-3 primary-bg rounded'>
              <img
                className='w-25 rounded-circle'
                src={PUBLIC_URL + 'images/' + user.prof_img}
                alt='profimg'
              />

              <div className='d-flex flex-column justify-content-end align-items-end align-self-end'>
                <h1 className='mb-0'>{user ? user.first_name : ''} </h1>
                <p className='text-light'>{user ? user.email : ''} </p>
              </div>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <h5>Account Information</h5>
              <Button className='px-3 py-2' onClick={handleShow}>
                <FaUserEdit size='0.7rem' /> &nbsp; Edit Profile
              </Button>
            </div>
            <div>
              <Table striped>
                <tbody>
                  <tr>
                    <td className='w-25'>Full Name</td>
                    <td>
                      {user ? user.first_name : ''}{' '}
                      {user ? user.user_details.middle_name : ''}{' '}
                      {user ? user.user_details.last_name : ''}{' '}
                      {user ? user.user_details.ext_name : ''}
                    </td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>{user ? user.email : ''}</td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>
                      {user.user_details ? user.user_details.street : ''}{' '}
                      {user.user_details ? user.user_details.barangay : ''}{' '}
                      {user.user_details ? user.user_details.city : ''}{' '}
                      {user.user_details ? user.user_details.province : ''}{' '}
                      {user.user_details ? user.user_details.region : ''}
                    </td>
                  </tr>

                  <tr>
                    <td>Contact Number</td>
                    <td>
                      {user.user_details
                        ? user.user_details.contact_number
                        : ''}
                    </td>
                  </tr>

                  <tr>
                    <td>Birthday </td>
                    <td>
                      {user.user_details ? user.user_details.birth_date : ''}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
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
                        {user ? user.last_name : ''} {user ? user.ext_name : ''}{' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                        <FaEdit />
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
                        {user.user_details ? user.user_details.city : ''}{' '}
                        {user.user_details ? user.user_details.province : ''}
                        {user.user_details ? user.user_details.region : ''}
                      </td>
                    </tr>

                    <tr>
                      <td>Contact Number</td>
                      <td>
                        {user.user_details
                          ? user.user_details.contact_number
                          : ''}
                      </td>
                    </tr>

                    <tr>
                      <td>Birthday </td>
                      <td>
                        {user.user_details ? user.user_details.birth_date : ''}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>
                  Close
                </Button>
                <Button className='scbutton' onClick={handleClose}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Card>
      </div>
      <Footer />
    </>
  ) : (
    <p>Loading...</p>
  );
};
