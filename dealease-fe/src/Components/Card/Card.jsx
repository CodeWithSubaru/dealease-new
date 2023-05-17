import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Row, Col, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardItem } from './CardItem';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import useProductContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

import useAddToCartContext from '../../Hooks/Context/AddToCartContext';
import { Load } from '../../Components/Loader/Load';

export function Card() {
  const { user, token } = useAuthContext();
  const {
    products,
    fetchProduct,
    fetchPublicProducts,
    loading,
    fetchThisWeek,
    fetchThisDay,
    fetchAvailable,
    searchProduct,
  } = useProductContext();

  const { msgStatus, status } = useAddToCartContext();
  const [currentColor, setCurrentColor] = useState(0);

  useEffect(() => {
    fetchPublicProducts(user.user_id);
  }, []);

  return (
    <div className='cards '>
      <div className='cards_container '>
        <Container className='mt-5 '>
          <h1 className='text-home mb-3'>{token ? 'Home' : 'Products'}</h1>
          <div className='justify-content-between'>
            <Row>
              <Col className='d-flex '>
                <span
                  className={
                    'rounded-pill btn btn-filter-product mt-3  fw-semibold ' +
                    (currentColor == 0 ? 'btn-primary' : 'btn-secondary')
                  }
                  onClick={() => {
                    fetchPublicProducts(user.user_id);
                    setCurrentColor(0);
                  }}
                >
                  All
                </span>

                <span
                  className={
                    'rounded-pill btn btn-filter-product mt-3  fw-semibold ' +
                    (currentColor == 1 ? 'btn-primary' : 'btn-secondary')
                  }
                  onClick={() => {
                    fetchThisDay(user.user_id);
                    setCurrentColor(1);
                  }}
                >
                  Today
                </span>

                <span
                  className={
                    'rounded-pill btn btn-filter-product mt-3  fw-semibold ' +
                    (currentColor == 2 ? 'btn-primary' : 'btn-secondary')
                  }
                  onClick={() => {
                    fetchAvailable(user.user_id);
                    setCurrentColor(2);
                  }}
                >
                  Available
                </span>
              </Col>
              <Col md={3}>
                <InputGroup className='mt-3'>
                  <InputGroup.Text id='basic-addon1'>
                    {' '}
                    <FontAwesomeIcon icon={faSearch} style={{ opacity: 0.5 }} />
                  </InputGroup.Text>
                  <Form.Control
                    type='search'
                    placeholder='Search here...'
                    className={' search-input'}
                    style={{
                      transition: '.5s all ease',
                    }}
                    aria-label='Search'
                    onChange={searchProduct}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>
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
          {loading ? (
            <Load />
          ) : (
            <Row className='mx-2 h-100'>
              {products.length > 0 ? (
                products.map((product, data) =>
                  product && !product.deleted_at ? (
                    <Col className='mb-4' key={data}>
                      <CardItem
                        key={product.id}
                        id={product.id}
                        src={'http://localhost:8000/images/' + product.image}
                        createdAt={product.created_at}
                        title={product.title}
                        text={product.description}
                        price={product.price_per_kg}
                        seller={product.seller}
                        button='Add to cart'
                        editbutton='Edit'
                        delbutton='Delete'
                        path='/services'
                      />
                    </Col>
                  ) : (
                    ''
                  )
                )
              ) : (
                <div className='h-100 d-flex align-items-center'>
                  No Products Found
                </div>
              )}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}
