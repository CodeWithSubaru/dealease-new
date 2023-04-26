import { Withdraw } from '../../Components/Pages/Withdraw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Footer } from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';

export function WithdrawBuyer() {
  const { collapseSidebar } = useProSidebar();
  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar backgroundColor='#19a9d0'>
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
            <MenuItem component={<Link to='/' />}>
              <FontAwesomeIcon icon={faHouse} className='navs-icon' /> Home
            </MenuItem>
            <MenuItem component={<Link to='/withdraw' />}> Withdraw</MenuItem>
            <MenuItem> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <button onClick={() => collapseSidebar()}>Collapse</button>
          <button className='btn btn-dark'>Recharge</button>
          <Withdraw />
        </main>
        <Footer />
      </div>
    </>
  );
}
