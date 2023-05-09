import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Container, Button } from 'react-bootstrap';
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
    <div className='cards' id='products'>
      <div className='cards_container'>
        <Container className='mt-5 px-5'>
          <Row>
            <Col>
              <h1 className='text-home mb-5'>{token ? 'Home' : 'Products'}</h1>
              <div className='d-flex align-items-end'>
                <span
                  className={
                    'rounded-pill btn btn-sm me-3 fw-semibold ' +
                    (currentColor == 0 ? 'btn-primary' : 'btn-secondary')
                  }
                  onClick={() => {
                    fetchPublicProducts(user.user_id);
                    setCurrentColor(0);
                  }}
                >
                  All
                </span>
                <div className='d-flex flex-column'>
                  <small className='fw-bold mb-1 ms-2'>DATE</small>
                  <div>
                    <span
                      className={
                        'rounded-pill btn btn-sm me-3 fw-semibold ' +
                        (currentColor == 1 ? 'btn-primary' : 'btn-secondary')
                      }
                      onClick={() => {
                        fetchThisDay();
                        setCurrentColor(1);
                      }}
                    >
                      Today
                    </span>
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <small className='fw-bold mb-1 ms-2'>STATUS</small>
                  <span
                    className={
                      'rounded-pill btn btn-sm me-3 fw-semibold ' +
                      (currentColor == 2 ? 'btn-primary' : 'btn-secondary')
                    }
                    onClick={() => {
                      fetchAvailable();
                      setCurrentColor(2);
                    }}
                  >
                    Available
                  </span>
                </div>

                <div className='flex-grow-1'>
                  <Form className='w-100'>
                    <div className='position-relative d-flex justify-content-end'>
                      <Form.Control
                        type='search'
                        placeholder='Search...'
                        className={'rounded-pill w-25'}
                        style={{
                          transition: '.5s all ease',
                          paddingLeft: '32px',
                        }}
                        aria-label='Search'
                        onChange={searchProduct}
                      />
                      <div
                        className='position-absolute ms-1'
                        style={{ top: '5px', right: '205px' }}
                      >
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ opacity: 0.5 }}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
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

        <div className='cards_wrapper' style={{ minHeight: '85vh' }}>
          {/* Card for Seller */}
          {loading ? (
            <Load />
          ) : (
            <Row className='mx-2 h-100'>
              {products.length > 0 ? (
                products.map((product, data) =>
                  product && !product.deleted_at ? (
                    <Col className='mb-4 card-card' key={product.id}>
                      <CardItem
                        key={product.id}
                        id={product.id}
                        src={'http://localhost:8000/images/' + product.image}
                        createdAt={product.created_at}
                        text={product.description}
                        seller={product.user_id}
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
