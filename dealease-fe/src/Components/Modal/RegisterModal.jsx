import React from 'react';
import '../../assets/scss/global.scss';
import '../../assets/scss/modal.scss';
import { Register } from '../../Pages/Auth/Register';

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

export function RegisterModal(props) {
  return (
    <Modal
      className='modal register_modal'
      dialogClassName='modal-container modal-lg'
      show={props.showRegister}
      keyboard
      onHide={props.onHideRegister}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <div className='boxregister'>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className='text-white fw-bold'>Register</h1>
          </Modal.Title>
        </Modal.Header>{' '}
        <i></i>
        <Modal.Body>
          <Container>
            <Row>
              <Register />
            </Row>
          </Container>
        </Modal.Body>
      </div>
    </Modal>
  );
}
