import React, { useEffect, useState } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Card } from '../../Components/Card/Card';
import { Footer } from '../../Components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useOrderContext from '../../Hooks/Context/OrderContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axiosClient from '../../api/axios';

export const HomeUser = () => {
  const [updateAccessModal, setUpdateAccessModal] = useState(false);
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();
  const { collapseSidebar } = useProSidebar();
  const { setDoneTransaction } = useOrderContext();

  function closeUpdateAccessModal() {
    setUpdateAccessModal(false);
  }

  const [validIdFront, setValidIdFront] = useState('');
  const [validIdBack, setValidIdBack] = useState('');
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  const onImageChangeFront = (event) => {
    if (event.target.files && event.target.files[0]) {
      setValidIdFront(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onImageChangeBack = (event) => {
    if (event.target.files && event.target.files[0]) {
      setValidIdBack(URL.createObjectURL(event.target.files[0]));
    }
  };

  function handleUpdateAccessForm(e) {
    e.preventDefault();
    const data = {
      valid_id_front: validIdFront,
      valid_id_back: validIdBack,
      terms_and_conditions: termsAndCondition,
    };
    axiosClient
      .post('/auth/update-access', data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    setDoneTransaction(false);
    setValidIdFront('../../../images/default_image.png');
    setValidIdBack('../../../images/default_image.png');
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          width='190px'
          collapsedWidth='65px'
          transitionDuration='500'
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#19a9d0',
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? '#f5d9ff' : '#white',
                    backgroundColor: active ? '#eecef9' : undefined,
                  };
              },
            }}
          >
            <button className='btn ' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              {/* <FontAwesomeIcon icon={faHouse} className='navs-icon' />  */}
              Home
            </MenuItem>

            <MenuItem component={<Link to='/withdraw' />}> Withdraw </MenuItem>
            <MenuItem component={<Link to='/recharge' />}> Recharge </MenuItem>
            {user.verified_user ? (
              <MenuItem component={<Link to='/product' />}> Product </MenuItem>
            ) : (
              <div className='d-flex flex-column justify-content-end flex-grow-1 h-100'>
                <Button
                  className='btn btn-sm d-inline-block'
                  onClick={() => setUpdateAccessModal(true)}
                >
                  Update Access
                </Button>
              </div>
            )}
          </Menu>
        </Sidebar>
        <main className='w-100 '>
          <Modal
            show={updateAccessModal}
            onHide={closeUpdateAccessModal}
            animation={false}
            size='lg'
          >
            <Modal.Header closeButton>
              <Modal.Title className='fw-semibold'>
                Request Update Acccess
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert show={true} variant='success'>
                <div className='d-flex justify-content-between'>
                  <Alert.Heading>Instruction </Alert.Heading>

                  <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip id='button-tooltip-2'>
                        <div className='p-2 text-start'>
                          Once you didn't follow the instruction, we will
                          automatically reject your request.
                        </div>
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </OverlayTrigger>
                </div>
                <ul>
                  <li>
                    Please make sure that both pictures of the government IDs
                    are clear and valid.
                  </li>
                </ul>
                <hr />
                <div className='clearfix'>
                  <p className='float-end mb-0'> - System Administator</p>
                </div>
              </Alert>
              <Form onSubmit={handleUpdateAccessForm}>
                <div className='d-flex align-items-center clearfix mb-3'>
                  <Form.Group controlId='formFile' className='mb-3 w-100'>
                    <Form.Label className='text-secondary'>
                      Valid Government Id (Front)
                    </Form.Label>
                    <Form.Control
                      type='file'
                      id='formFile'
                      onChange={onImageChangeFront}
                    />
                  </Form.Group>
                  <div className='w-50'>
                    <div className='float-end'>
                      <p className='mb-0'>ID Preview (Front)</p>
                      <img
                        src={validIdFront}
                        className='rounded p-3 float-end'
                        style={{
                          height: '150px',
                          width: '150px',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='d-flex align-items-center clearfix'>
                  <Form.Group controlId='formFile' className='w-100 mb-3'>
                    <Form.Label className='text-secondary'>
                      Valid Government Id (Back)
                    </Form.Label>
                    <Form.Control
                      type='file'
                      id='formFile'
                      onChange={onImageChangeBack}
                    />
                  </Form.Group>
                  <div className='w-50'>
                    <div className='float-end'>
                      <p className='mb-0'>ID Preview (Back)</p>
                      <img
                        src={validIdBack}
                        className='rounded p-3 float-end'
                        style={{
                          height: '150px',
                          width: '150px',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Form.Check
                  onChange={(e) => setTermsAndCondition(e.target.checked)}
                  type='checkbox'
                  id='termsAndCondition'
                  label={
                    <Form.Label
                      className='text-secondary fw-light'
                      controlId='termsAndCondition'
                    >
                      I agree to the{' '}
                      <a
                        href='/termsAndCondition'
                        target='_blank'
                        className='fw-bold'
                      >
                        {' '}
                        Terms and Condition
                      </a>
                    </Form.Label>
                  }
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                className='rounded'
                onClick={closeUpdateAccessModal}
              >
                Cancel
              </Button>
              <Button
                variant='primary'
                className='rounded'
                onClick={closeUpdateAccessModal}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          <button className='btn btn-dark' to={'/recharge'}>
            Recharge
          </button>
          <Card />
        </main>
        <Footer />
      </div>
    </>
  );
};
