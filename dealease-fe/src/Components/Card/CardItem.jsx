import React from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faEdit,
  faTrash,
  faCartShopping,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Edit } from '../Modal/Editmodal';
import { MydModalWithGrid } from '../Modal/Signupmoda';
import axiosClient from '../../api/axios';
import useAddToCartContext from '../../Hooks/Context/AddToCartContext';
import API_URI from '../../api/public_url';

export function CardItem(props) {
  const { token, user } = useAuthContext();
  const [editModalshow, setEditmodalShow] = useState(false);
  const [signinModal, setSigninModal] = useState(false);
  const userType = localStorage.getItem('USER_TYPE');
  const { setMsgStatus, setStatus, fetchCountInItemsCart } =
    useAddToCartContext();

  function addToCart(id) {
    axiosClient
      .post('/orders', { id })
      .then((res) => {
        setMsgStatus(res.data.status);
        setStatus(true);
        fetchCountInItemsCart();
      })
      .catch((e) => {
        setMsgStatus(e.response.data.status);
        setStatus(false);
      });
  }

  function dateFormat(date) {
    const convertedDate = new Date(date);
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = convertedDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  // Soft Delete Product
  const deleteProduct = (product_id) => {
    Delete().then((resp) => {
      if (resp.isConfirmed) {
        axiosClient
          .delete('/seller/product/' + product_id)
          .catch((e) => console.log(e));
        setProductDataTable();
      }
    });
  };

  return (
    <>
      <div className=''>
        <div className='cards_item_link' to={props.path}>
          <figure className='cards_item_pic-wrap'>
            <img src={props.src} alt='Fish' className='cards_item_img' />
          </figure>
          <div className='cards_item_info'>
            <h5 className='cards_item_text'>{props.text}</h5>
            <div className='text-center mt-2'></div>
            {
              <>
                <MydModalWithGrid
                  show={signinModal}
                  onHide={() => setSigninModal(false)}
                />
                <button
                  className='btn make-deal rounded'
                  onClick={() =>
                    !token ? setSigninModal(true) : addToCart(props.id)
                  }
                >
                  {props.button}
                  <FontAwesomeIcon icon={faCartPlus} className='ms-1' />
                </button>
              </>
            }
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
