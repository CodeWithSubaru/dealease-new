// solla
import { Button } from '../Button/Button';
import '../../assets/scss/herosection.scss';
import '../../assets/scss/global.scss';
import { Container } from 'react-bootstrap';

export function HeroSection(props) {
  // const about = useRef(null);
  return (
    <>
      <div className='video-overlay'>
        <video src={'/videos/video.mp4'} autoPlay loop muted />
      </div>
      <Container>
        <div className='hero-container'>
          <h1>Make a Deal Now</h1>
          <p>What are you waiting for?</p>
          <div className='hero-btns d-flex align-items-center'>
            <Button
              className='btns'
              buttonStyle='btn-outline'
              buttonSize='btn-large'
              onClick={() => props.showRegisterModal()}
            >
              Get Started
            </Button>
            <a
              className='btn btn-primary btn-large text-decoration-none border border-2 border-primary'
              href='#products'
            >
              See Posts
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
export default HeroSection;
