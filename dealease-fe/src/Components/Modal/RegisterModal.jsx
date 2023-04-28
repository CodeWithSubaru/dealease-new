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
        <i></i>
        <Modal.Body>
          <Container>
            <Row>
              <Register />
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex mx-2 w-100 justify-content-center mx-5'>
            <Button variant='light' className='btn-close-footer me-3' onHide>
              Cancel
            </Button>
            <Button
              variant='light'
              className='btn-submit'
              type='submit'
              form='registerForm'
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
