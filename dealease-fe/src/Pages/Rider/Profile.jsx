import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Form, Row, Col, Container } from "react-bootstrap";
import PUBLIC_URL from "../../api/public_url";
import axiosClient from "../../api/axios";
import useAuthContext from "../../Hooks/Context/AuthContext";
import { FaUserEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBurger,
  faHamburger,
  faHouse,
  faSliders,
  faTable,
  faToggleOn,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Footer } from "../../Components/Footer/Footer";
export const ProfileBuyer = () => {
  const [show, setShow] = useState(false);
  const [reportUserModal, setReportUserModal] = useState(false);
  const { user } = useAuthContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleReportUser() {
    axiosClient.post(PUBLIC_URL + "/users/" + user);
  }

  function showReportUserModal() {
    setReportUserModal(true);
  }

  function hideReportUserModal() {
    setReportUserModal(false);
  }

  return user ? (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar
          width="190px"
          collapsedWidth="65px"
          transitionDuration="500"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#1f98f4",
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#white",
                    backgroundColor: active ? "#eecef9" : undefined,
                  };
              },
            }}
          >
            <button className="btn" onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className="navs-icon" />
            </button>

            <MenuItem
              className="text-black "
              // icon={<FaHouse />}
              component={<Link to="/" />}
            >
              <FontAwesomeIcon icon={faHouse} className="navs-icon" />
              Home
            </MenuItem>
            <SubMenu label="Transactions">
              {/* <FontAwesomeIcon icon={faInbox} className="navs-icon" /> */}
              {/* <MenuItem component={<Link to="/withdraw" />}> Withdraw </MenuItem> */}
              <MenuItem component={<Link to="/recharge" />}>
                {" "}
                Recharge{" "}
              </MenuItem>
            </SubMenu>
            <MenuItem className="text-black" component={<Link to="/inbox" />}>
              <FontAwesomeIcon icon={faInbox} className="navs-icon" />
              Inbox
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className="w-100" style={{ minHeight: "815px" }}>
          <div className="userprofile">
            <form method="">
              <Row>
                <div className="col-md-4">
                  <img
                    className="profimg rounded-circle"
                    src={PUBLIC_URL + "images/" + user.prof_img}
                    alt="profimg"
                  />

                  <div className="proffirst">
                    {user ? user.first_name : ""}{" "}
                  </div>
                  <div className="profemail">{user ? user.email : ""} </div>
                  <div className="backgrnd"></div>
                  <div className="accountinfo">
                    <h5>Account Information</h5>
                  </div>
                  <div className="proftable">
                    <Table striped>
                      <tbody>
                        <tr>
                          <td>Full Name</td>
                          <td>
                            {user ? user.first_name : ""}{" "}
                            {user ? user.middle_name : ""}{" "}
                            {user ? user.last_name : ""}{" "}
                            {user ? user.ext_name : ""}
                          </td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>{user ? user.email : ""}</td>
                        </tr>

                        <tr>
                          <td>Address</td>
                          <td>
                            {user.user_details ? user.user_details.street : ""}
                            {user.user_details
                              ? user.user_details.barangay
                              : ""}
                            {user.user_details ? user.user_details.city : ""}{" "}
                            {user.user_details
                              ? user.user_details.province
                              : ""}
                            {user.user_details ? user.user_details.region : ""}
                          </td>
                        </tr>

                        <tr>
                          <td>Contact Number</td>
                          <td>
                            {user.user_details
                              ? user.user_details.contact_number
                              : ""}
                          </td>
                        </tr>

                        <tr>
                          <td>Birthday </td>
                          <td>
                            {user.user_details
                              ? user.user_details.birth_date
                              : ""}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="modalprof">
                    <Button className="disbutton" onClick={handleShow}>
                      <FaUserEdit size="0.7rem" /> &nbsp; Edit Profile
                    </Button>

                    {/* <Button variant='light' onClick={showReportUserModal}>
                  <FaUserEdit size='0.7rem' /> &nbsp; Report
                </Button> */}

                    {/* Modal Profile User */}
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Table striped>
                          <tbody>
                            <tr>
                              <td>Full Name</td>
                              <td>
                                {user ? user.first_name : ""}{" "}
                                {user ? user.middle_name : ""}{" "}
                                {user ? user.last_name : ""}{" "}
                                {user ? user.ext_name : ""} <FaEdit />
                              </td>
                            </tr>

                            <tr>
                              <td>Email</td>
                              <td>{user ? user.email : ""} </td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>
                                {user.user_details
                                  ? user.user_details.street
                                  : ""}
                                {user.user_details
                                  ? user.user_details.barangay
                                  : ""}
                                {user.user_details
                                  ? user.user_details.city
                                  : ""}{" "}
                                {user.user_details
                                  ? user.user_details.province
                                  : ""}
                                {user.user_details
                                  ? user.user_details.region
                                  : ""}
                              </td>
                            </tr>

                            <tr>
                              <td>Contact Number</td>
                              <td>
                                {user.user_details
                                  ? user.user_details.contact_number
                                  : ""}
                              </td>
                            </tr>

                            <tr>
                              <td>Birthday </td>
                              <td>
                                {user.user_details
                                  ? user.user_details.birth_date
                                  : ""}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Close
                        </Button>
                        <Button className="scbutton" onClick={handleClose}>
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </Row>
            </form>

            {/* Modal Report User */}
            <Modal
              show={reportUserModal}
              onHide={hideReportUserModal}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="text-black-50">
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black-50">Reason</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">Scam</option>
                      <option value="2">Sample 1</option>
                      <option value="3">Sample 2</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label className="text-black-50">
                      Proof of your report (Screenshot)
                    </Form.Label>
                    <Form.Label>Multiple files input example</Form.Label>
                    <Form.Control type="file" multiple />
                  </Form.Group>

                  <Form.Check
                    type="checkbox"
                    label="Sigurado ka ba na nais mong mag-file ng report laban sa user na ito? Kung mapatunayan na may kasalanan ang indibidwal, magpapatuloy ang pagre-report. Mahalaga na maunawaan na may mga banta sa iyong mga aksyon, at kung hindi pasok ang report sa kwalipikasyon, magkakaroon ng babala."
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={hideReportUserModal}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};
