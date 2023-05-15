import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import 'rsuite/dist/rsuite.min.css';
const panelStyles = {
  padding: '15px 20px',
  color: '#aaa',
};

const headerStyles = {
  padding: 20,
  fontSize: 16,
  background: '#34c3ff',
  color: ' #fff',
};

export function SettingsUser() {
  return (
    <>
      <div style={{ width: 240 }}>
        <Sidenav defaultOpenKeys={['3', '4']}>
          <Sidenav.Header>
            <div style={headerStyles}>Custom Sidenav</div>
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey='1' active icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey='2' icon={<GroupIcon />}>
                User Group
              </Nav.Item>
              <Nav.Menu eventKey='3' title='Advanced' icon={<MagicIcon />}>
                <Nav.Item divider />
                <Nav.Item panel style={panelStyles}>
                  Reports
                </Nav.Item>
                <Nav.Item eventKey='3-1'>Geo</Nav.Item>
                <Nav.Item eventKey='3-2'>Devices</Nav.Item>
                <Nav.Item eventKey='3-3'>Loyalty</Nav.Item>
                <Nav.Item eventKey='3-4'>Visit Depth</Nav.Item>
                <Nav.Item divider />
                <Nav.Item panel style={panelStyles}>
                  Settings
                </Nav.Item>
                <Nav.Item eventKey='4-1'>Applications</Nav.Item>
                <Nav.Item eventKey='4-2'>Channels</Nav.Item>
                <Nav.Item eventKey='4-3'>Versions</Nav.Item>
                <Nav.Menu eventKey='4-5' title='Custom Action'>
                  <Nav.Item eventKey='4-5-1'>Action Name</Nav.Item>
                  <Nav.Item eventKey='4-5-2'>Action Params</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
      {/* <div className=' '>
        <Nav defaultActiveKey='/home' className='flex-column'>
          <Nav.Link href='/home'>Profile</Nav.Link>
          <Nav.Link eventKey='link-1'>Change Password</Nav.Link>
          <Nav.Link eventKey='link-2'>Orders</Nav.Link>
          <Nav.Link eventKey='disabled' disabled>
            Disabled
          </Nav.Link>
        </Nav>
      </div> */}
    </>
  );
}
