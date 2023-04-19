// export function Card({ className, children }) {
//   return <div className={className}>{children}</div>;
// }
import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { CardItem } from './CardItem';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import axiosClient from '../../api/axios';
import useProductContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function Card() {
  const { user, token } = useAuthContext();
  const { products, fetchProduct, fetchPublicProducts } = useProductContext();

  useEffect(() => {
    fetchPublicProducts();
  }, []);

  return (
    <div className='cards' id='products'>
      <div className='cards_container'>
        <div className='cards_wrapper'>
          <Container>
            <Row>
              <Col>
                <h1 className='text-home'>{token ? 'Home' : 'Products'}</h1>
              </Col>
              <Col>
                <Form>
                  <Form.Control
                    type='search'
                    placeholder='Search...'
                    className='search-post'
                    aria-label='Search'
                  />
                </Form>
              </Col>
            </Row>
          </Container>
          {/* Card for Seller */}
          <Row className='mx-2'>
            {products.length > 0
              ? products.map((product, data) =>
                  product ? (
                    <Col className='mb-4 card-card'>
                      <CardItem
                        key={data}
                        src={'http://localhost:8000/images/' + product.image}
                        text={product.description}
                        label='Sold'
                        button='Make a Deal'
                        editbutton='Edit'
                        delbutton='Delete'
                        path='/services'
                      />
                    </Col>
                  ) : (
                    ''
                  )
                )
              : ''}
          </Row>

          {/* Card for buyer */}
          {/* <ul className='cards_items'> */}
          {/* <Row className='mx-2'>
            <Col className='mb-4'>
              <CardItem
                src='/images/image-1.jpg'
                text='1 kilo bangus tirahin mo na baka matira pa nang iba'
                label='Sold'
                button='Make a Deal'
                editbutton='Edit'
                delbutton='Delete'
                path='/services'
              />
            </Col>
            <Col className='mb-4'>
              <CardItem
                src='/images/image-1.jpg'
                text='1 kilo bangus tirahin mo na baka matira pa nang iba'
                label='Sold'
                button='Make a Deal'
                editbutton='Edit'
                delbutton='Delete'
                path='/services'
              />
            </Col>
            <Col className='mb-4'>
              <CardItem
                src='/images/image-1.jpg'
                text='1 kilo bangus tirahin mo na baka matira pa nang iba'
                label='Sold'
                button='Make a Deal'
                editbutton='Edit'
                delbutton='Delete'
                path='/services'
              />
            </Col>
            <Col className='mb-4'>
              <CardItem
                src='/images/image-1.jpg'
                text='1 kilo bangus tirahin mo na baka matira pa nang iba'
                label='Sold'
                button='Make a Deal'
                editbutton='Edit'
                delbutton='Delete'
                path='/services'
              />
            </Col>
            <Col className='mb-4'>
              <CardItem
                src='/images/image-1.jpg'
                text='1 kilo bangus tirahin mo na baka matira pa nang iba'
                label='Sold'
                button='Make a Deal'
                editbutton='Edit'
                delbutton='Delete'
                path='/services'
              />
            </Col>
          </Row> */}
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
}
