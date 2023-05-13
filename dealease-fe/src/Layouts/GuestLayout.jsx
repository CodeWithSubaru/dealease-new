import { Navigate, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useAuthContext from '../Hooks/Context/AuthContext';
import { Footer } from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAngry, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export function GuestLayout() {
  const { user_type, token } = useAuthContext();
  const localStoreUserType = localStorage.getItem('USER_TYPE');

  if (token) {
    if (user_type == 'User') {
      return <Navigate to='/home' />;
    } else if (user_type == 'Rider') {
      return <Navigate to='/rider/to-pick-up' />;
    } else if (user_type == 'Admin') {
      return <Navigate to='/admin/dashboard' />;
    }
  }

  return (
    <>
      <Header />
      <Outlet />
      <div className='contacts-footer bg-dark text-white'>
        <Container fluid>
          <Row>
            <Col md={3} className='mb-5'>
              <span className='fs-3 fw-bold fst-italic text-white'>
                <img
                  alt=''
                  src='/images/dealeasefavicon.png'
                  width='40'
                  height='40'
                  className='d-inline-block align-top'
                />{' '}
                Dealease
              </span>
            </Col>
            <Col md={3} className='mb-5'>
              {/* <span className='fs-3 fw-bold fst-italic text-white'>
                <img
                  alt=''
                  src='/images/dti.png'
                  width='180'
                  height='180'
                  className='d-inline-block align-top'
                />
              </span> */}
            </Col>
            <Col className='pb-5'>
              <Row>
                <Col>
                  <h5>Service</h5>
                  <div className=''>
                    <a href='' className='text-decoration-none'>
                      Business
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Personal
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      FAQs
                    </a>
                  </div>
                </Col>
                <Col>
                  <h5>Company</h5>
                  <div className=''>
                    <a href='' className='text-decoration-none'>
                      About us
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Deliver Care
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Contact us
                    </a>
                  </div>
                </Col>
                <Col>
                  <h5>Legal</h5>
                  <div className=''>
                    <a href='' className='text-decoration-none'>
                      Privacy Policy
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Cookie Policy
                    </a>
                    <br />
                    <a href='' className='text-decoration-none'>
                      Terms and Condition
                    </a>
                  </div>
                </Col>
              </Row>
              <div className='d-flex justify-content-end mt-5'>
                <h5 className='my-auto me-5'>Follow us on </h5>
                <a href='https://www.facebook.com/'>
                  <img
                    alt=''
                    src='/images/socmed/fblogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
                <a href='https://www.instagram.com/'>
                  <img
                    alt=''
                    src='/images/socmed/instagramlogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
                <a href='https://www.youtube.com/'>
                  <img
                    alt=''
                    src='/images/socmed/youtubelogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
                <a href='https://www.linkedin.com/'>
                  <img
                    alt=''
                    src='/images/socmed/linkedinlogo.png'
                    width='40'
                    height='40'
                    className='me-3 d-inline-block align-top'
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
