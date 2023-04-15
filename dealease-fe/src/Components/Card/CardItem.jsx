import React from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Edit } from '../Modal/Editmodal';
import { MydModalWithGrid } from '../Modal/Signupmoda';
export function CardItem(props) {
  const [editModalshow, setEditmodalShow] = useState(false);
  const [signinModal, setSigninModal] = useState(false);
  const userType = localStorage.getItem('USER_TYPE');

  return (
    <>
      <div className=''>
        <div className='cards_item_link' to={props.path}>
          <figure className='cards_item_pic-wrap' data-category={props.label}>
            <img src={props.src} alt='Fish' className='cards_item_img' />
          </figure>
          <div className='cards_item_info'>
            <h5 className='cards_item_text'>{props.text}</h5>
            {userType === 'Seller' || userType === 'Buyer_seller2' ? (
              <Container>
                <Row>
                  <Col>
                    <Edit
                      show={editModalshow}
                      onHide={() => setEditmodalShow(false)}
                    />

                    <Button
                      onClick={() => setEditmodalShow(true)}
                      className='btn make-deal'
                      name='edit'
                      id='edit'
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      &nbsp; {props.editbutton}
                    </Button>
                  </Col>
                  <Col>
                    <button className='btn make-deal' name='delete' id='delete'>
                      <FontAwesomeIcon icon={faTrash} />
                      &nbsp; {props.delbutton}
                    </button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <>
                <MydModalWithGrid
                  show={signinModal}
                  onHide={() => setSigninModal(false)}
                />
                <button
                  className='btn make-deal'
                  onClick={() => setSigninModal(true)}
                >
                  {props.button}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <input type='file' onChange={onImageChange} className='filetype' />

      {image && <img src={image} alt='preview image' />}
    </div>
  );
}
