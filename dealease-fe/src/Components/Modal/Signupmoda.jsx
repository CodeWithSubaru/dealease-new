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
    <Modal
      className='modal-login'
      show={props.show}
      dialogClassName='modal-md login-modal'
      keyboard
      onHide={props.onHide}
    >
      <div className='box'>
        <i></i>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </div>
    </Modal>
  );
}
