import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardItem } from './CardItem';
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
    <div>
      <div className='card m-5'>
        <div className='mt-5 d-flex'>
          <div className='d-flex justify-content-between flex-grow-1 px-3'>
            <div className='w-100'>
              <h1 className='text-home mb-3'>{token ? 'Home' : 'Products'}</h1>
              <div className='d-flex justify-content-between'>
                <div>
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
                </div>

                <Form className='d-flex flex-grow-1 justify-content-end mt-3'>
                  <div className='position-relative d-flex '>
                    <Form.Control
                      type='search'
                      placeholder='Search...'
                      className={'rounded-pill search-input w-100'}
                      style={{
                        transition: '.5s all ease',
                        paddingLeft: '32px',
                      }}
                      aria-label='Search'
                      onChange={searchProduct}
                    />
                    <div
                      className='position-absolute search-icon ms-1'
                      // style={{ top: '5px', right: '205px' }}
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
          </div>
        </div>

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
