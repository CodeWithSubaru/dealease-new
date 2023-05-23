import { Withdraw } from '../../Components/Pages/Withdraw';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';
import { Card, Container } from 'react-bootstrap';
export function WithdrawUser() {
  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarUser />
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
