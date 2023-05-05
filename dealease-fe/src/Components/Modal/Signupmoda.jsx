import React from 'react';
import '../../assets/scss/global.scss';
import '../../assets/scss/modal.scss';
import { H3 } from '../../Components/Helpers/index.style';
import { Login } from '../../Pages/Auth/Login';
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
} from 'react-bootstrap';
import { LoginAdmin } from '../../Pages/Auth/LoginAdmin';

export function MydModalWithGrid(props) {
  return (
    <Modal className='modal' show={props.show} keyboard onHide={props.onHide}>
      <div className='box'>
        <i></i>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
                  <Row className='navs-pills'>
                    <Col>
                      <Nav variant='pills' className='d-flex flex-column'>
                        <Nav.Item>
                          <Nav.Link eventKey='first' className='navName'>
                            User
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Tab.Content>
                        <Tab.Pane eventKey='first'>
                          <Login />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
              {/* <div className="">
                <div className=" mt-3">
                  <button
                    onClick={props.onHide}
                    variant="danger"
                    className="btn modal-close "
                  >
                    Cancel
                  </button>
                </div>
              </div> */}
            </Row>
          </Container>
        </Modal.Body>
      </div>
    </Modal>
  );
}
