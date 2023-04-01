import React from "react";
import "../../assets/scss/header.scss";
import "../../assets/scss/global.scss";
import { H3 } from "../../Components/Helpers/index.style";
import { Login } from "../../Pages/Auth/Login";
import { LoginSeller } from "../../Pages/Auth/LoginSeller";
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Button,
  Tab,
  Nav,
} from "react-bootstrap";
import { LoginAdmin } from "../../Pages/Auth/LoginAdmin";
export function MydModalWithGrid(props) {
  return (
    <Modal
      show={props.show}
      keyboard
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <H3>Login</H3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first" className="navName">
                          Buyer
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="second" className="navName">
                          Seller
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="third" className="navName">
                          Admin
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Login />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <LoginSeller />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <LoginAdmin />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger" className="button-30">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
