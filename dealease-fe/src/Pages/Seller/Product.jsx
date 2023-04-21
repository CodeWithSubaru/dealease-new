import React, { useEffect } from 'react';
import { useState } from 'react';
import { TableComponent } from '../../Components/Table/Table';
import '../../assets/scss/global.scss';
import { Card } from '../../Components/Card/Card';
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from 'react-bootstrap';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { H1 } from '../../Components/Helpers/index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../Components/Footer/footer';
import PUBLIC_URL from '../../api/public_url';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import '../../assets/scss/post-section.scss';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';
import useProductContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

const header = [
  {
    title: 'Id',
    prop: 'id',
    isSortable: true,
  },
  {
    title: 'Product Name',
    prop: 'title',
  },
  {
    title: 'Product Description',
    prop: 'description',
  },
  {
    title: 'Stocks',
    prop: 'stock',
    isFilterable: true,
    isSortable: true,
  },
  {
    title: 'Price',
    prop: 'price',
    isFilterable: true,
    isSortable: true,
  },
  {
    title: 'Date Joined',
    prop: 'date_joined',
    isSortable: true,
  },
  { title: 'Action', prop: 'action' },
];
// Show Create User Modal
// const [showCreateUser, setShowCreateUser] = useState(false);
// const showCreateUserModal = () => setShowCreateUser(true);
// const closeCreateUserModal = () => {
//   setShowCreateUser(false);
//   setErrors([]);
// };
export const ProductSeller = () => {
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState([]);
  const { fetchProduct, products } = useProductContext();
  const { setRegistrationSuccess } = useAuthContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [stocks_per_kg, setStocks] = useState('');
  const [price_per_kg, setPrice] = useState('');
  const data = {
    title,
    description,
    image,
    stocks_per_kg,
    price_per_kg,
  };
  const handlePost = (e) => {
    e.preventDefault();
    console.log(data);
    axiosClient
      .post('/seller/product', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.status == 200) {
          Notification({
            title: 'Success',
            message: res.data.message,
            icon: 'success',
          }).then(() => {
            setTitle('');
            setDescription('');
            setImage('');
            setStocks('');
            setPrice('');
          });
          setProductDataTable();
        }
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  useEffect(() => {
    return () => {
      setRegistrationSuccess(false);
    };
  }, []);

  function dateFormat(date) {
    let yourDate = new Date(date);
    yourDate = yourDate.toUTCString();
    return yourDate.split(' ').slice(1, 4).join(' ');
  }

  function setProductDataTable() {
    axiosClient.get('/seller/product').then((resp) => {
      const product = resp.data.listOfProduct.map((product, i) => {
        return {
          id: i + 1,
          title: (
            <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
              <img
                src={PUBLIC_URL + 'images/' + product.image}
                className='rounded'
                style={{ width: 'auto', height: '50px' }}
              />{' '}
              <p className='my-auto '>{product.title}</p>
            </div>
          ),
          description: product.description,
          stock: product.stocks_per_kg,
          price: product.price_per_kg,
          date_joined: dateFormat(product.created_at),
          action: (
            <div key={i} className='button-actions'>
              <span
                onClick={() => viewCompleteDetails(user.user_id)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faEye} className='mx-2' />
              </span>
              <span
                onClick={() => findUser(user.user_id)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faEdit} className='mx-2' />
              </span>
              <span
                onClick={() => deleteUser(user.user_id)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faTrash} className='mx-2' />
              </span>
            </div>
          ),
        };
      });

      setBody(product);
    });
  }

  useEffect(() => {
    setProductDataTable();
  }, [body.id]);

  return (
    <>
      <div className='post_container mb-5'>
        <Container className='container_item px-5'>
          <H1>PRODUCTS</H1>

          <Form onSubmit={handlePost} className='mb-5'>
            <Row>
              {/* <Col>
                <div className='image-container'>
                  <img
                    src='/images/1.jpg'
                    alt=''
                    className='imagepost float-end mb-4'
                  />
                </div>
              </Col> */}
              <Col>
                <Form.Group className='mt-2'>
                  <Form.Label className='text-black'>Product Name</Form.Label>
                  <Form.Control
                    type='text'
                    className='form-control'
                    autoComplete='none'
                    value={title ? title : ''}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label className='text-black'>
                    Product Description
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    className='form-control textarea-input'
                    aria-label='Small'
                    aria-describedby='inputGroup-sizing-sm'
                    placeholder="What's on your mind?"
                    autoComplete='none'
                    value={description ? description : ''}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label className='text-black'>Product Image</Form.Label>
                  <Form.Control
                    type='file'
                    className='form-control mb-3'
                    autoComplete='none'
                    // value={image ? image : ''}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className=''>
                      <Form.Label className='text-black'>
                        Stocks (in kg)
                      </Form.Label>
                      <Form.Control
                        type='number'
                        className='form-control'
                        autoComplete='none'
                        value={stocks_per_kg ? stocks_per_kg : ''}
                        onChange={(e) => setStocks(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className=''>
                      <Form.Label className='text-black'>
                        Price (per kg)
                      </Form.Label>
                      <Form.Control
                        type='number'
                        className='form-control'
                        autoComplete='none'
                        value={price_per_kg ? price_per_kg : ''}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <button className='w-100 btn btn-primary mt-3'>Add</button>
              </Col>
            </Row>
          </Form>
          {/* <HeroSection /> */}
          <TableComponent
            header={header}
            body={body}
            button={<Button variant='primary'>Add Product</Button>}
          />
        </Container>
      </div>
      {/* <Card /> */}
      <Footer />
    </>
  );
};
