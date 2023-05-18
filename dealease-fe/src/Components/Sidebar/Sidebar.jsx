import "rsuite/dist/rsuite.min.css";
import { useState } from "react";
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
} from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: "#34c3ff",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

// const NavToggle = ({ expand, onChange }) => {
//   return (
//     <Navbar appearance='subtle' className='nav-toggle'>
//       <Nav>
//         <Nav.Menu
//           noCaret
//           placement='topStart'
//           trigger='click'
//           title={<CogIcon style={{ width: 20, height: 20 }} size='sm' />}
//         >
//           <Nav.Item>Help</Nav.Item>
//           <Nav.Item>Settings</Nav.Item>
//           <Nav.Item>Sign out</Nav.Item>
//         </Nav.Menu>
//       </Nav>

//       <Nav pullRight>
//         <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
//           {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
//         </Nav.Item>
//       </Nav>
//     </Navbar>
//   );
// };

export function SidebarUser() {
  // const [expand, setExpand] = useState(true);
  return (
    <>
      <div className="show-fake-browser sidebar-page">
        <Container style={{ width: "250px" }}>
          <Sidebar
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              height: "100%",
              position: "fixed",
              top: "0",
            }}
          >
            <Sidenav
              className="mt-5"
              defaultOpenKeys={["3"]}
              appearance="subtle"
            >
              <Sidenav.Body className="mt-4">
                <Nav>
                  <Nav.Item
                    href="/"
                    eventKey="1"
                    active
                    icon={<DashboardIcon />}
                  >
                    Home
                  </Nav.Item>
                  <Nav.Item
                    href="/transactions"
                    eventKey="2"
                    icon={<GroupIcon />}
                  >
                    Shell Transactions
                  </Nav.Item>
                  <Nav.Item href="/orders" eventKey="2" icon={<GroupIcon />}>
                    Orders
                  </Nav.Item>
                  <Nav.Item
                    href="/orders/seller"
                    eventKey="2"
                    icon={<GroupIcon />}
                  >
                    Orders (Seller)
                  </Nav.Item>

                  <Nav.Menu
                    eventKey="4"
                    trigger="hover"
                    title="Settings"
                    icon={<GearCircleIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item href="/profile" eventKey="4-1">
                      Profile
                    </Nav.Item>
                    <Nav.Item href="/change-password" eventKey="4-2">
                      Change Password
                    </Nav.Item>
                    {/* {user.verified_user ? (
                      <Nav.Item
                        component={<Link to="/product" />}
                        eventKey="4-3"
                      >
                        Product
                      </Nav.Item>
                    ) : (
                      <div className="d-flex flex-column justify-content-end flex-grow-1 h-100">
                        <Button
                          className="btn btn-sm d-inline-block"
                          onClick={() => setUpdateAccessModal(true)}
                        >
                          Update Access
                        </Button>
                      </div>
                    )} */}
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>

          {/* <Container>
            <Header>
              <h2>Page Title</h2>
            </Header>
            <Content>Content</Content>
          </Container> */}
        </Container>
      </div>
    </>
  );
}
export function SidebarRider() {
  // const [expand, setExpand] = useState(true);
  return (
    <>
      <div className="show-fake-browser sidebar-page">
        <Container style={{ width: "250px" }}>
          <Sidebar
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              height: "100%",
              position: "fixed",
              top: "0",
            }}
          >
            <Sidenav
              className="mt-5"
              defaultOpenKeys={["3"]}
              appearance="subtle"
            >
              <Sidenav.Body className="mt-4">
                <Nav>
                  <Nav.Item
                    href="/"
                    eventKey="1"
                    active
                    icon={<DashboardIcon />}
                  >
                    To Pick Up
                  </Nav.Item>
                  <Nav.Item
                    href="/rider/to-deliver"
                    eventKey="2"
                    icon={<GroupIcon />}
                  >
                    To Deliver
                  </Nav.Item>
                  <Nav.Item
                    href="/rider/delivered"
                    eventKey="2"
                    icon={<GroupIcon />}
                  >
                    Delivered
                  </Nav.Item>
                  <Nav.Menu
                    eventKey="4"
                    trigger="hover"
                    title="Settings"
                    icon={<GearCircleIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item href="/rider/profile" eventKey="4-1">
                      Profile
                    </Nav.Item>
                    <Nav.Item href="/rider/change-password" eventKey="4-2">
                      Change Password
                    </Nav.Item>
                    {/* {user.verified_user ? (
                      <Nav.Item
                        component={<Link to='/product' />}
                        eventKey='4-3'
                      >
                        Product
                      </Nav.Item>
                    ) : (
                      <div className='d-flex flex-column justify-content-end flex-grow-1 h-100'>
                        <Button
                          className='btn btn-sm d-inline-block'
                          onClick={() => setUpdateAccessModal(true)}
                        >
                          Update Access
                        </Button>
                      </div>
                    )} */}
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>

          {/* <Container>
            <Header>
              <h2>Page Title</h2>
            </Header>
            <Content>Content</Content>
          </Container> */}
        </Container>
      </div>
    </>
  );
}
