// export function Card({ className, children }) {
//   return <div className={className}>{children}</div>;
// }
import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Container, Button } from 'react-bootstrap';
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

  // Widthdraw from shell into money
  const [shellToConvert, setShellToConvert] = useState(0);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchPublicProducts();
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
        <div className='cards_wrapper'>
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
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              axiosClient
                .post('/request-withdrawal', {
                  wallet: 0,
                  shell_coin_amount: shellToConvert,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => setErrors(e.response.data.message));
            }}
          >
            <h1>Request for Widthdrawal</h1>
            <Form.Group>
              <Form.Label className='text-black'>Shell amount</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => {
                  setShellToConvert(e.target.value);
                  setErrors([]);
                }}
                isInvalid={
                  shellToConvert >
                    Number(user.buyer_wallet?.shell_coin_amount) ||
                  errors.length > 0
                }
              />
              <Form.Control.Feedback type='invalid'>
                {errors.length > 0
                  ? errors
                  : shellToConvert >
                      Number(user.buyer_wallet?.shell_coin_amount) &&
                    'Insufficient Balance!'}
              </Form.Control.Feedback>
              Converted to Peso
              <br />
              Php {Number(shellToConvert / 1.5).toFixed(2)}
            </Form.Group>

            <Button type='submit' variant='primary'>
              Widthdraw
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
