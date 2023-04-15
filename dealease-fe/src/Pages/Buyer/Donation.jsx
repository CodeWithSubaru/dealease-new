import Card from 'react-bootstrap/Card';
import { H1 } from '../../Components/Helpers/index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../Components/Footer/footer';

export function DonationBuyer() {
  return (
    <div style={{ height: '82vh' }}>
      <Card className='w-75 mx-auto'>
        <div className='p-4'>
          <H1>Donasyon</H1>
          <div className='primary-bg rounded p-5'>
            <div className='w-50 mx-auto'>
              <h2 className='mb-2'>Donasyon para sa website</h2>
              <p className='mb-3'>
                Kung nagustuhan mo ang serbisyo na ibinibigay ng aming website,
                malaking tulong po sa amin ang iyong donasyon. Ito po ay
                magpapalawak ng aming kakayahan na magbigay ng mas magandang
                serbisyo sa inyo. Maraming salamat po sa inyong suporta!
              </p>
            </div>

            <div className='d-flex w-50 mx-auto text-center'>
              <div className='d-flex flex-column align-items-center me-4 flex-grow-1 px-3 py-4 border border-3 border-info rounded position-relative overflow-hidden'>
                <div
                  className='position-absolute'
                  style={{
                    top: '-80px',
                    right: '-15px',
                    fontSize: '150px',
                    opacity: 0.1,
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <h3 className='mb-3'>Scan</h3>
                <span className='mb-4'>
                  Maari kang magbigay ng donasyon gamit ang iyong GCash account
                  upang ibahagi ang iyong donasyon
                </span>
                <img
                  src='/images/gcash-donation.jpg'
                  alt='gcash-donation'
                  className='w-75 h-75'
                />
              </div>

              <div className='d-flex flex-column align-items-center flex-grow-1 px-3 py-4 border border-3 border-info rounded position-relative overflow-hidden'>
                <div
                  className='position-absolute'
                  style={{
                    top: '-80px',
                    right: '-15px',
                    fontSize: '150px',
                    opacity: 0.1,
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <h3 className='mb-3'>Phone Number</h3>
                <span className='mb-4'>
                  Maari kang magbigay ng donasyon gamit ang iyong gcash account
                  at ibahagi gamit ang cellphone number
                </span>
                <h5 className='mb-3'>
                  <FontAwesomeIcon icon={faPhone} /> Phone Number
                </h5>
                <p className='badge text-bg-primary fs-6 mb-0'>0935-5630-446</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Footer />
    </div>
  );
}