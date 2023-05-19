import { Withdraw } from '../../Components/Pages/Withdraw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faTable } from '@fortawesome/free-solid-svg-icons';

import { Footer } from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { SidebarRider } from '../../Components/Sidebar/Sidebar';

export function WithdrawRider() {
  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarRider />
        <main className='w-100' style={{ minHeight: '486px' }}>
          <Container className='mb-5'>
            <Card className='forgot-password-card m-auto mt-5 p-5'>
              <Withdraw />
            </Card>
          </Container>
        </main>
      </div>
    </>
  );
}
