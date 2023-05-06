import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { CardItem } from './CardItem';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import useProductContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

import useAddToCartContext from '../../Hooks/Context/AddToCartContext';

export function Card() {
  const { user, token } = useAuthContext();
  const { products, fetchProduct, fetchPublicProducts } = useProductContext();

  const { msgStatus, status } = useAddToCartContext();

  useEffect(() => {
    fetchPublicProducts(user.user_id);
  }, []);

  return (
    <div className='cards' id='products'>
      <div className='cards_container'>
        <Container className='mt-5 px-5'>
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

        {msgStatus && (
          <div
            className={
              'fadeInDown text-capitalize w-50 p-3 text-center mx-auto alert position-fixed bg-opacity-100 ' +
              (status ? 'alert-primary' : 'alert-danger')
            }
            style={{ top: '100px', zIndex: '10' }}
            role='alert'
          >
            {msgStatus}
          </div>
        )}

        <div className='cards_wrapper'>
          {/* Card for Seller */}
          <Row className='mx-2'>
            {products.length > 0
              ? products.map((product, data) =>
                  product ? (
                    <Col className='mb-4 card-card'>
                      <CardItem
                        key={data}
                        id={product.id}
                        src={'http://localhost:8000/images/' + product.image}
                        createdAt={product.created_at}
                        text={product.description}
                        seller={product.user}
                        label='Sold'
                        button='Add to cart '
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
        </div>
      </div>
    </div>
  );
}
