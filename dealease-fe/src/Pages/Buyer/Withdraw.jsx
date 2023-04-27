import { Withdraw } from '../../Components/Pages/Withdraw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTable } from '@fortawesome/free-solid-svg-icons';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { Footer } from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Modal, Row, Col, Container } from 'react-bootstrap';

export function WithdrawBuyer() {
  const { collapseSidebar } = useProSidebar();
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
            <button className='btn btn-dark' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faTable} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              {/* <FontAwesomeIcon icon={faHouse} className='navs-icon' />  */}
              Home
            </MenuItem>
            <SubMenu label='Transactions'>
              <MenuItem> Withdraw </MenuItem>
              <MenuItem> Recharge </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to='/withdraw' />}> Withdraw</MenuItem>
            <MenuItem component={<Link to='/inbox' />}> Inbox</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <div style={{ height: '100vh' }}>
            <button className='btn btn-dark'>Recharge</button>
            <Withdraw />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
