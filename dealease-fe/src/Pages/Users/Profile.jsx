import useAuthContext from "../../Hooks/Context/AuthContext";
import Table from "react-bootstrap/Table";
import { Footer } from "../../Components/Footer/Footer";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import PUBLIC_PATH from "../../api/public_url";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
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
import { Row } from "react-bootstrap";
import { Col, Container } from "react-bootstrap";

import { CustomNav } from "../../Components/Header/CustomNav";
import { SidebarUser } from "../../Components/Sidebar/Sidebar";

export const ProfileUser = () => {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeKey, setActiveKey] = useState(null);

  return user ? (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <SidebarUser />
        <main
          className="w-100 bg-white m-3 mt-5 p-2 shadow"
          style={{ minHeight: "815px" }}
        >
          <div className="userprofile">
            <form method="">
              <div className="row">
                <div className="col pt-4">
                  <center>
                    <h5 className="">Account Information</h5>
                    <img
                      className="text-center rounded"
                      src={PUBLIC_PATH + "images/" + user.prof_img}
                      alt="profimg"
                      style={{ minWidth: "200px", height: "50vh" }}
                    />
                  </center>
                  <br />
                  {/* <FaUserEdit size="0.7rem" /> &nbsp;
                      <a href="#" onClick={handleShow}>
                        Edit Profile
                      </a> */}
                  <Container>
                    <Row>
                      <Col xs={3}>Full Name:</Col>
                      <Col xs={5}>
                        {/* <InputGroup size="sm" className="mb-3">
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Small
                          </InputGroup.Text>
                          <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </InputGroup> */}
                        {user ? user.first_name : ""}{" "}
                        {user.user_details ? user.user_details.middle_name : ""}{" "}
                        {user.user_details ? user.user_details.last_name : ""}{" "}
                        {user.user_details ? user.user_details.ext_name : ""}
                      </Col>
                      <Col
                        xs={3}
                        style={{
                          color: "#0c6ffd",
                        }}
                      >
                        <FaUserEdit size="0.7rem" /> &nbsp; Change
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col xs={3}>Email:</Col>
                      <Col xs={5}>{user ? user.email : ""} </Col>
                      <Col
                        xs={2}
                        style={{
                          color: "#0c6ffd",
                        }}
                      >
                        <FaUserEdit size="0.7rem" /> &nbsp; Change
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col xs={3}>Phone:</Col>
                      <Col xs={5}>
                        {user.user_details
                          ? user.user_details.contact_number
                          : ""}
                      </Col>
                      <Col
                        xs={2}
                        style={{
                          color: "#0c6ffd",
                        }}
                      >
                        <FaUserEdit size="0.7rem" /> &nbsp; Change
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col xs={3}>Password:</Col>
                      <Col
                        xs={5}
                        style={{
                          color: "#0c6ffd",
                        }}
                      >
                        <FaUserEdit size="0.7rem" /> &nbsp;
                        <a href="change-password">Change</a>
                      </Col>
                    </Row>
                  </Container>
                  <div className="modalprof">
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
                                {user ? user.ext_name : ""}
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
                                <FaEdit />
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
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

function NavUser() {
  const [active, setActive] = useState("home");

  return (
    <CustomNav
      appearance="subtle"
      reversed
      active={active}
      onSelect={setActive}
    />
  );
}
