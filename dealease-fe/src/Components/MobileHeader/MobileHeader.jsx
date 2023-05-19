import 'rsuite/dist/rsuite.min.css';
import { useState, useEffect } from 'react';
import {
  Panel,
  PanelGroup,
  Drawer,
  Placeholder,
  IconButton,
  Divider,
} from 'rsuite';
import { Navbar, Nav, Input, InputGroup, Badge } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'rsuite/Avatar';
import {
  faBagShopping,
  faBox,
  faBoxesAlt,
  faBoxesPacking,
  faCartShopping,
  faShop,
  faUserAlt,
  faUserAstronaut,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import PUBLIC_PATH from '../../api/public_url';
import { Loader } from '../Loader/Loader';
import useAddToCartContext from '../../Hooks/Context/AddToCartContext';
import { RechargeWallet } from '../RechargeWallet/RechargeWallet';
import GearIcon from '@rsuite/icons/Gear';
import { UpdateAccess } from '../../Pages/Auth/UpdateAccess';
import Alert from 'react-bootstrap/Alert';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { faBars, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

const styles = {
  width: 'auto',
};

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
// import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import {
  FaMale,
  FaUserAltSlash,
  FaUserAstronaut,
  FaUserNinja,
} from 'react-icons/fa';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useProductContext from '../../Hooks/Context/ProductContext';

export function NavbarUser({ onSelectTop, activeKeyTop, ...props }) {
  const { user } = useAuthContext();
  const { searchProduct1 } = useProductContext();
  const { loading } = useAuthContext();

  const [UserNavbarMobilenew, setUserNavbarMobile] =
    useState('UserNavbarMobile');

  const listenScrollEvent = (event) => {
    if (window.scrollY < 0.5) {
      return setUserNavbarMobile('UserNavbarMobile');
    } else if (window.scrollY > 0.5) {
      return setUserNavbarMobile('UserNavbarMobile2');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      <Navbar className={UserNavbarMobilenew} {...props}>
        <Navbar.Brand href='/home' className='text-nowrap fw-bold fst-italic'>
          <img
            alt=''
            src='/images/dealeasefavicon.png'
            width='25'
            height='25'
            className='d-inline-block align-top me-2'
          />
          DEALEASE
        </Navbar.Brand>
        <Nav onSelect={onSelectTop} activeKey={activeKeyTop}>
          <InputGroup inside style={styles}>
            <Input
              type='search'
              className='input'
              onChange={(e) => {
                searchProduct1(e);
              }}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Nav>
        <Nav pullRight>
          <Nav.Item>
            <Avatar
              circle
              // src='https://avatars.githubusercontent.com/u/1203827'
              src={PUBLIC_PATH + 'images/' + user.prof_img}
              alt='@simonguo'
              className='me-3'
            />
            {user.first_name ? user.first_name : ''}
          </Nav.Item>
        </Nav>
      </Navbar>
      {loading && <Loader visibility={loading}></Loader>}
    </>
  );
}
export function NavbarRiderProfile({ onSelectTop, activeKeyTop, ...props }) {
  const { user } = useAuthContext();
  const { loading } = useAuthContext();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <Navbar className='RiderProfileNavbarMobile' {...props}>
        <Navbar.Brand>
          <Avatar
            onClick={() => setOpenProfile(true)}
            size='lg'
            circle
            // src='https://avatars.githubusercontent.com/u/1203827'
            src={PUBLIC_PATH + 'images/' + user.prof_img}
            alt='@simonguo'
            className='avatarProfile'
          />
        </Navbar.Brand>
        <Nav>
          <div style={{ marginTop: '35px' }}>
            <span className='nameProfile'>
              {user.first_name ? user.first_name : ''}
              <Divider vertical />
              <Badge className='' content='Rider' />
              <p className='nameEmail'>{user.email ? user.email : ''}</p>
            </span>
          </div>
        </Nav>
        <Nav pullRight>
          <div style={{ marginTop: '40px' }}>
            <IconButton
              onClick={() => setOpenProfile(true)}
              color='blue'
              appearance='primary'
              icon={<GearIcon />}
              circle
              size='lg'
              className='me-4'
            />
          </div>
        </Nav>
      </Navbar>
      <Drawer
        // size='full'
        style={{ width: '100%' }}
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-center'>Account Settings</Drawer.Title>
          <Drawer.Actions>
            {/* <Button onClick={() => setOpenProfile(false)}>Cancel</Button>
            <Button onClick={() => setOpenProfile(false)} appearance='primary'>
              Confirm
            </Button> */}
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body className='panelGroupSettings'>
          <PanelGroup accordion defaultActiveKey={1} bordered>
            <Panel shaded header='Update Access' eventKey={1} id='panel1'>
              <Placeholder.Paragraph />
              <Avatar
                circle
                // src='https://avatars.githubusercontent.com/u/1203827'
                src={PUBLIC_PATH + 'images/' + user.prof_img}
                alt='@simonguo'
                className='mx-auto '
              />
            </Panel>
            <Panel shaded header='Change Password' eventKey={2} id='panel2'>
              <Placeholder.Paragraph />
            </Panel>
            <Panel shaded header='Update Access' eventKey={3} id='panel3'>
              <Placeholder.Paragraph />
            </Panel>
          </PanelGroup>
        </Drawer.Body>
      </Drawer>
      {loading && <Loader visibility={loading}></Loader>}
    </>
  );
}
export function NavbarUserProfile({ onSelectTop, activeKeyTop, ...props }) {
  const { user } = useAuthContext();
  const { loading } = useAuthContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [validIdFront, setValidIdFront] = useState(null);
  const [validIdBack, setValidIdBack] = useState(null);
  const [imgFront, setImgFront] = useState(null);
  const [imgBack, setImgBack] = useState(null);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [errors, setErrors] = useState([]);
  const [check, setCheck] = useState(false);
  const handleCheckboxChange = (e) => {
    setCheck(e.target.checked);
    sessionStorage.setItem('check-subs-agreement', e.target.checked);
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
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
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
        }).then(() => {});
      })
      .catch((e) => setErrors(e.response.data.errors));
  }
  return (
    <>
      <Navbar className='RiderProfileNavbarMobile' {...props}>
        <Navbar.Brand>
          <Avatar
            onClick={() => setOpenProfile(true)}
            size='lg'
            circle
            // src='https://avatars.githubusercontent.com/u/1203827'
            src={PUBLIC_PATH + 'images/' + user.prof_img}
            alt='@simonguo'
            className='avatarProfile'
          />
        </Navbar.Brand>
        <Nav>
          <div style={{ marginTop: '35px' }}>
            <span className='nameProfile'>
              {user.first_name ? user.first_name : ''}
              <Divider vertical />
              <Badge className='' content='User' />
              <p className='nameEmail'>{user.email ? user.email : ''}</p>
            </span>
          </div>
        </Nav>
        <Nav pullRight>
          <div style={{ marginTop: '40px' }}>
            <IconButton
              onClick={() => setOpenProfile(true)}
              color='blue'
              appearance='primary'
              icon={<GearIcon />}
              circle
              size='lg'
              className='me-4'
            />
          </div>
        </Nav>
      </Navbar>
      <Drawer
        // size='full'
        style={{ width: '100%' }}
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-center'>Account Settings</Drawer.Title>
          <Drawer.Actions>
            {/* <Button onClick={() => setOpenProfile(false)}>Cancel</Button>
            <Button onClick={() => setOpenProfile(false)} appearance='primary'>
              Confirm
            </Button> */}
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body className='panelGroupSettings'>
          <PanelGroup accordion bordered>
            <Panel shaded header='Update Access' eventKey={1} id='panel1'>
              <Alert show={true} variant='success'>
                <div className='d-flex justify-content-between'>
                  <Alert.Heading style={{ fontSize: '14px' }}>
                    Instruction{' '}
                  </Alert.Heading>

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
                    Please make sure that both pictures of the government IDs
                    are clear and valid.
                  </li>
                </ul>
                <hr />
                <div className='clearfix'>
                  <p className='float-end mb-0'> - System Administator</p>
                </div>
              </Alert>
              <Form onSubmit={handleUpdateAccessForm} id='updateAccessForm'>
                <div className='d-flex flex-column align-items-center clearfix mb-3'>
                  <div className='w-auto'>
                    <div className='float-end'>
                      <p className='mb-0 text-center'>First ID Preview </p>
                      <img
                        src={imgFront}
                        className='rounded p-3 float-end'
                        style={{
                          height: '300px',
                          width: '300px',
                        }}
                      />
                    </div>
                  </div>
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
                    {console.log(errors)}
                    <Form.Control.Feedback type='invalid'>
                      {errors.valid_id_front}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className='d-flex flex-column align-items-center clearfix'>
                  <div className='w-auto'>
                    <div className='float-end'>
                      <p className='mb-0 text-center'>Second ID Preview </p>
                      <img
                        src={imgBack}
                        className='rounded p-3 float-end'
                        style={{
                          height: '300px',
                          width: '300px',
                        }}
                      />
                    </div>
                  </div>
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
                </div>

                <Form.Group className='my-2'>
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
                        <a
                          onClick={handleShow}
                          target='_blank'
                          className='fw-bold'
                        >
                          Terms and Condition
                        </a>
                      </Form.Label>
                    </Col>
                  </Row>

                  {/* <Form.Control.Feedback type='invalid' className='text-danger'>
                    {errors.length > 0 &&
                      errors.terms_and_conditions.length > 0 &&
                      errors.terms_and_conditions[0]}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Form>

              <Button
                disabled={!check}
                variant='primary'
                className='rounded'
                form='updateAccessForm'
                type='submit'
              >
                Submit
              </Button>

              <Modal scrollable show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant='primary'
                    className='rounded'
                    onClick={handleClose}
                  >
                    I understand
                  </Button>
                </Modal.Footer>
              </Modal>
            </Panel>
            {/* <Panel shaded header='Logout' eventKey={1} id='panel1'></Panel> */}
          </PanelGroup>
          <div className='p-5'>
            <button
              className='btn btn-danger p-3'
              style={{ bottom: '0' }}
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </Drawer.Body>
      </Drawer>
      {loading && <Loader visibility={loading}></Loader>}
    </>
  );
}

export function MobileHeader({ onSelect, activeKey, ...props }) {
  const { countItemsInCart, fetchCountInItemsCart } = useAddToCartContext();
  const { user } = useAuthContext();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='customNav bg-white'>
      <Nav justified {...props} activeKey={activeKey} onSelect={onSelect}>
        <Nav.Item
          href='/home'
          className='flex-column d-flex text-center'
          eventKey='home'
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faShop} />
          <span className='mobile-icon-label'>Home</span>
        </Nav.Item>
        <Nav.Item
          href='/orders'
          className='flex-column d-flex text-center'
          eventKey='orders'
        >
          <FontAwesomeIcon
            className='mobile-icon mx-auto'
            icon={faBagShopping}
          />
          <span className='mobile-icon-label'>Orders</span>
        </Nav.Item>
        {user.verified_user == 1 ? (
          <>
            <Nav.Item
              href='/orders/seller'
              className='flex-column d-flex text-center'
              eventKey='orders/seller'
            >
              <div className='position-relative'>
                <Badge content='Seller'>
                  <FontAwesomeIcon
                    className='mobile-icon mx-auto'
                    icon={faBagShopping}
                  />
                </Badge>
              </div>
              <span className='mobile-icon-label'>Orders</span>
            </Nav.Item>
          </>
        ) : (
          ''
        )}
        <Nav.Item
          href='/add-to-cart'
          className='flex-column d-flex text-center'
          eventKey='cart'
        >
          <Badge
            content={countItemsInCart === 9 ? '9+' : countItemsInCart}
            className='mobile-icon mx-auto'
          >
            <FontAwesomeIcon
              className='mobile-icon mx-auto'
              icon={faCartShopping}
            />
          </Badge>
          <span className='mobile-icon-label mt-2'>Cart</span>
        </Nav.Item>
        <Nav.Item
          className='flex-column d-flex text-center'
          eventKey='wallet'
          onClick={() => setModalShow(true)}
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faWallet} />
          <span className='mobile-icon-label'>Wallet</span>
        </Nav.Item>
        <Nav.Item
          href='/profile'
          className='flex-column d-flex text-center'
          eventKey='Me'
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faUserAlt} />
          <span className='mobile-icon-label'>Me</span>
        </Nav.Item>
      </Nav>

      <RechargeWallet modalShow={modalShow} setModalShow={setModalShow} />
    </div>
  );
}

export function MobileHeaderRider({ onSelect, activeKey, ...props }) {
  return (
    <div className='customNav bg-white'>
      <Nav justified {...props} activeKey={activeKey} onSelect={onSelect}>
        <Nav.Item
          href='/'
          className='flex-column d-flex text-center'
          eventKey='to-pick-up'
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faBox} />
          <span className='mobile-icon-label'>To Pick Up</span>
        </Nav.Item>
        <Nav.Item
          href='/rider/to-deliver'
          className='flex-column d-flex text-center'
          eventKey='to-deliver'
        >
          <FontAwesomeIcon
            className='mobile-icon mx-auto'
            icon={faBoxesPacking}
          />
          <span className='mobile-icon-label'>To Deliver</span>
        </Nav.Item>
        <Nav.Item
          href='/rider/delivered'
          className='flex-column d-flex text-center'
          eventKey='to-delivered'
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faBoxesAlt} />
          <span className='mobile-icon-label'>Delivered</span>
        </Nav.Item>
        <Nav.Item
          className='flex-column d-flex text-center'
          eventKey='wallet'
          onClick={() => setModalShow(true)}
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faWallet} />
          <span className='mobile-icon-label'>Wallet</span>
        </Nav.Item>
        <Nav.Item
          href='/rider/profile'
          className='flex-column d-flex text-center'
          eventKey='Me'
        >
          <FontAwesomeIcon
            className='mobile-icon mx-auto'
            icon={faUserAstronaut}
          />
          <span className='mobile-icon-label'>Me</span>
        </Nav.Item>
      </Nav>
    </div>
  );
}
