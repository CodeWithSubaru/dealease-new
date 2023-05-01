import useAuthContext from '../../Hooks/Context/AuthContext';
import Table from 'react-bootstrap/Table';
import { Footer } from '../../Components/Footer/Footer';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUserEdit } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import PUBLIC_PATH from '../../api/public_url';

export const ProfileUser = () => {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return user ? (
    <>
      <div className='userprofile'>
        <form method=''>
          <div className='row'>
            <div className='col-md-4'>
              <img
                className='profimg rounded-circle'
                src={PUBLIC_PATH + 'images/' + user.prof_img}
                alt='profimg'
              />
              <div className='proffirst'>{user ? user.first_name : ''} </div>
              <div className='profemail'>{user ? user.email : ''} </div>
              <div className='backgrnd'></div>
              <div className='accountinfo'>
                <h5>Account Information</h5>
              </div>
              <div className='proftable'>
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
                      <td>{user ? user.email : ''}</td>
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
              </div>

              <div className='modalprof'>
                <Button className='disbutton' onClick={handleShow}>
                  <FaUserEdit size='0.7rem' /> &nbsp; Edit Profile
                </Button>

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
                            {user.user_details ? user.user_details.street : ''}
                            {user.user_details
                              ? user.user_details.barangay
                              : ''}
                            {user.user_details ? user.user_details.city : ''}{' '}
                            {user.user_details
                              ? user.user_details.province
                              : ''}
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
                            {user.user_details
                              ? user.user_details.birth_date
                              : ''}
                            <FaEdit />
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
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  ) : (
    <p>Loading...</p>
  );
};
