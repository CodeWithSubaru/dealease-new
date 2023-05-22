import 'rsuite/dist/rsuite.min.css';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Notification } from '../../Components/Notification/Notification';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
} from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useOrderContext from '../../Hooks/Context/OrderContext';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axios';
import { FaBoxOpen } from 'react-icons/fa';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

// const NavToggle = ({ expand, onChange }) => {
//   return (
//     <Navbar appearance='subtle' className='nav-toggle'>
//       <Nav>
//         <Nav.Menu
//           noCaret
//           placement='topStart'
//           trigger='click'
//           title={<CogIcon style={{ width: 20, height: 20 }} size='sm' />}
//         >
//           <Nav.Item>Help</Nav.Item>
//           <Nav.Item>Settings</Nav.Item>
//           <Nav.Item>Sign out</Nav.Item>
//         </Nav.Menu>
//       </Nav>

//       <Nav pullRight>
//         <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
//           {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
//         </Nav.Item>
//       </Nav>
//     </Navbar>
//   );
// };

export function SidebarUser() {
  const [updateAccessModal, setUpdateAccessModal] = useState(false);
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();
  const { setDoneTransaction } = useOrderContext();
  const [errors, setErrors] = useState([]);

  function closeUpdateAccessModal() {
    setUpdateAccessModal(false);
  }

  //
  const [validIdFront, setValidIdFront] = useState(null);
  const [validIdBack, setValidIdBack] = useState(null);
  const [imgFront, setImgFront] = useState(null);
  const [imgBack, setImgBack] = useState(null);
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  // terms and condition modal
  const [check, setCheck] = useState(false);
  const handleCheckboxChange = (e) => {
    setCheck(e.target.checked);
    sessionStorage.setItem('check-subs-agreement', e.target.checked);
    setTermsAndCondition(e.target.checked);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onImageChangeFront = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgFront(URL.createObjectURL(event.target.files[0]));
      setValidIdFront(event.target.files[0]);
    }
  };

  const onImageChangeBack = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgBack(URL.createObjectURL(event.target.files[0]));
      setValidIdBack(event.target.files[0]);
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
      .post('/update-access', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => {
          closeUpdateAccessModal();
        });
      })
      .catch((e) => setErrors(e.response.data.errors));
  }

  useEffect(() => {
    setDoneTransaction(false);
    setImgFront('../../../images/default_image.png');
    setImgBack('../../../images/default_image.png');
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);

  return (
    <>
      <div className='show-fake-browser sidebar-page'>
        <Container style={{ width: '250px' }}>
          <Sidebar
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              height: '100%',
              position: 'fixed',
              top: '0',
            }}
          >
            <Sidenav
              className='mt-5'
              defaultOpenKeys={['3']}
              appearance='subtle'
            >
              <Sidenav.Body className='mt-4'>
                <Nav>
                  <Nav.Item
                    href='/'
                    eventKey='1'
                    active
                    icon={<DashboardIcon />}
                  >
                    Home
                  </Nav.Item>
                  <Nav.Item
                    href='/transactions'
                    eventKey='2'
                    icon={<GroupIcon />}
                  >
                    Shell Transactions
                  </Nav.Item>
                  <Nav.Item href='/orders' eventKey='2' icon={<GroupIcon />}>
                    Orders
                  </Nav.Item>

                  {user.verified_user == 1 ? (
                    <Nav.Item
                      href='/orders/seller'
                      eventKey='2'
                      icon={<GroupIcon />}
                    >
                      Orders (Seller)
                    </Nav.Item>
                  ) : (
                    ''
                  )}

                  {user.verified_user == 1 ? (
                    <>
                      <Nav.Item
                        href='/product'
                        eventKey='7'
                        style={{ paddingLeft: '20px' }}
                      >
                        <div>
                          {' '}
                          <span className='me-3'>
                            {' '}
                            <FaBoxOpen />{' '}
                          </span>{' '}
                          <span> Product </span>{' '}
                        </div>
                      </Nav.Item>
                    </>
                  ) : (
                    ''
                  )}
                  <Nav.Menu
                    eventKey='4'
                    trigger='hover'
                    title='Settings'
                    icon={<GearCircleIcon />}
                    placement='rightStart'
                  >
                    <Nav.Item href='/profile' eventKey='4-1'>
                      Profile
                    </Nav.Item>
                    <Nav.Item href='/change-password' eventKey='4-2'>
                      Change Password
                    </Nav.Item>
                    {user.verified_user === '1' ? (
                      <Nav.Item
                        component={<Link to='/product' />}
                        eventKey='4-3'
                      >
                        Product
                      </Nav.Item>
                    ) : (
                      <div className='d-flex flex-column justify-content-end flex-grow-1 h-100'>
                        {user.verified_user == 0 ? (
                          <Button
                            className='btn btn-sm d-inline-block'
                            onClick={() => setUpdateAccessModal(true)}
                          >
                            Update Access
                          </Button>
                        ) : (
                          ''
                        )}
                      </div>
                    )}
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>

          {/* <Container>
            <Header>
              <h2>Page Title</h2>
            </Header>
            <Content>Content</Content>
          </Container> */}
        </Container>
      </div>
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
            <ul className='ms-4'>
              <li>
                Please make sure that both pictures of the government IDs are
                clear and valid.
              </li>
            </ul>
            <hr />
            <div className='clearfix'>
              <p className='float-end mb-0'> - System Administator</p>
            </div>
          </Alert>
          <Form onSubmit={handleUpdateAccessForm} id='updateAccessForm'>
            <div className='d-flex align-items-center clearfix mb-3'>
              <Form.Group controlId='formFile' className='mb-3 w-100'>
                <Form.Label className='text-secondary'>
                  First Valid Government Id
                </Form.Label>
                <Form.Control
                  type='file'
                  id='formFile'
                  onChange={onImageChangeFront}
                  isInvalid={!!errors.valid_id_front}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.valid_id_front}
                </Form.Control.Feedback>
              </Form.Group>
              <div className='w-50'>
                <div className='float-end'>
                  <p className='mb-0 text-center'>First ID Preview </p>
                  <img
                    src={imgFront}
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
                  Second Valid Government Id
                </Form.Label>
                <Form.Control
                  type='file'
                  id='formFile'
                  onChange={onImageChangeBack}
                  isInvalid={!!errors.valid_id_back}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.valid_id_back}
                </Form.Control.Feedback>
              </Form.Group>
              <div className='w-50'>
                <div className='float-end'>
                  <p className='mb-0 text-center'>Second ID Preview </p>
                  <img
                    src={imgBack}
                    className='rounded p-3 float-end'
                    style={{
                      height: '150px',
                      width: '150px',
                    }}
                  />
                </div>
              </div>
            </div>

            <Form.Group>
              <Row xs='auto'>
                <Col
                  style={{
                    padding: '0 0 0 12px',
                  }}
                >
                  <Form.Check
                    checked={check}
                    onChange={handleCheckboxChange}
                    type='checkbox'
                    id='termsAndCondition'
                    isInvalid={!!errors.terms_and_conditions}
                    feedbackType='invalid'
                    feedback={
                      errors.terms_and_conditions &&
                      errors.terms_and_conditions.length > 0 &&
                      errors.terms_and_conditions[0]
                    }
                  />
                </Col>
                <Col>
                  <Form.Label
                    className='text-secondary fw-light mb-0'
                    controlId='termsAndCondition'
                  >
                    I agree to the
                    <a onClick={handleShow} target='_blank' className='fw-bold'>
                      Terms and Condition
                    </a>
                  </Form.Label>
                </Col>
              </Row>

              <Form.Control.Feedback type='invalid' className='text-danger'>
                {errors.length > 0 &&
                  errors.terms_and_conditions.length > 0 &&
                  errors.terms_and_conditions[0]}
              </Form.Control.Feedback>
            </Form.Group>
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
            disabled={!check}
            variant='primary'
            className='rounded'
            form='updateAccessForm'
            type='submit'
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal scrollable show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' className='rounded' onClick={handleClose}>
            I understand
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export function SidebarRider() {
  // const [expand, setExpand] = useState(true);
  return (
    <>
      <div className='show-fake-browser sidebar-page'>
        <Container style={{ width: '250px' }}>
          <Sidebar
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              height: '100%',
              position: 'fixed',
              top: '0',
            }}
          >
            <Sidenav
              className='mt-5'
              defaultOpenKeys={['3']}
              appearance='subtle'
            >
              <Sidenav.Body className='mt-4'>
                <Nav>
                  <Nav.Item
                    href='/'
                    eventKey='1'
                    active
                    icon={<DashboardIcon />}
                  >
                    To Pick Up
                  </Nav.Item>
                  <Nav.Item
                    href='/rider/to-deliver'
                    eventKey='2'
                    icon={<GroupIcon />}
                  >
                    To Deliver
                  </Nav.Item>
                  <Nav.Item
                    href='/rider/delivered'
                    eventKey='2'
                    icon={<GroupIcon />}
                  >
                    Delivered
                  </Nav.Item>
                  <Nav.Menu
                    eventKey='4'
                    trigger='hover'
                    title='Settings'
                    icon={<GearCircleIcon />}
                    placement='rightStart'
                  >
                    <Nav.Item href='/rider/profile' eventKey='4-1'>
                      Profile
                    </Nav.Item>
                    <Nav.Item href='/rider/change-password' eventKey='4-2'>
                      Change Password
                    </Nav.Item>
                    {/* {user.verified_user ? (
                      <Nav.Item
                        component={<Link to='/product' />}
                        eventKey='4-3'
                      >
                        Product
                      </Nav.Item>
                    ) : (
                      <div className='d-flex flex-column justify-content-end flex-grow-1 h-100'>
                        <Button
                          className='btn btn-sm d-inline-block'
                          onClick={() => setUpdateAccessModal(true)}
                        >
                          Update Access
                        </Button>
                      </div>
                    )} */}
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>

          {/* <Container>
            <Header>
              <h2>Page Title</h2>
            </Header>
            <Content>Content</Content>
          </Container> */}
        </Container>
      </div>
    </>
  );
}
