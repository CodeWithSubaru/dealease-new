// solla
import { Button } from '../Button/Button';
import '../../assets/scss/herosection.scss';
import '../../assets/scss/global.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function HeroSection(props) {
  // const about = useRef(null);
  return (
    <>
      <div className='video-overlay'>
        {/* <video src={'/videos/video.mp4'} autoPlay loop /> */}
        <img
          alt=''
          src='/images/landingpageBackground.jpg'
          style={{
            height: '700px',
            width: '100%',
            zIndex: '-1',
            position: 'absolute',
            objectFit: 'cover',
          }}
        />
      </div>
      <Container fluid>
        <div className='hero-container text-center'>
          <h1>Market that you need</h1>
          <p>What are you waiting for?</p>
          <div className='hero-btns d-flex justify-content-center align-items-center'>
            <Row>
              <Col lg={'6'} style={{ padding: '0px' }} className=''>
                <Link
                  className='btn btn-outline btn-large mt-3 text-decoration-none border border-2 border-light w-100 getstartedbtn'
                  to='/register'
                >
                  Get Started
                </Link>
              </Col>
              <Col lg={'6'} style={{ padding: '0px' }}>
                <a
                  className='btn btn-primary btn-large mt-3 text-decoration-none border border-2 border-light w-100 ordernowbtn'
                  href='#products'
                >
                  Order Now
                </a>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}
export default HeroSection;
