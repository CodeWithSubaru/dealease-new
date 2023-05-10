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
import { Footer } from '../../Components/Footer/Footer';
import PUBLIC_URL from '../../api/public_url';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import '../../assets/scss/post-section.scss';
import axiosClient from '../../api/axios';
import {
  Notification,
  Delete,
} from '../../Components/Notification/Notification';
import useProductContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    title: 'Date Added',
    prop: 'date_joined',
    isSortable: true,
  },
  { title: 'Action', prop: 'action' },
];
export const ProductUser = () => {
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState([]);
  const { fetchProduct } = useProductContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageDefault, setImageDefault] = useState('');
  const [stocks_per_kg, setStocks] = useState('');
  const [price_per_kg, setPrice] = useState('');
  const data = {
    title,
    description,
    image,
    stocks_per_kg,
    price_per_kg,
  };
  const [product_id, setProductId] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Show Create Product Modal
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const showCreateProductModal = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setStocks('');
    setPrice('');
    setShowCreateProduct(true);
  };
  const closeCreateProductModal = () => {
    setShowCreateProduct(false);
    setErrors([]);
  };

  // Show specific Product Modal
  const [showSpecificProduct, setShowSpecificProduct] = useState(false);
  const [showSpecificProductData, setShowSpecificProductData] = useState(false);

  const viewProductDetails = (id) => {
    axiosClient.get('/seller/product/' + id).then((res) => {
      setShowSpecificProductData(res.data.data);
      setShowSpecificProduct(true);
    });
  };

  const closeSpecificProductModal = () => {
    setShowSpecificProduct(false);
  };

  // Show Edit Product Modal
  const [showEditProduct, setShowEditProduct] = useState(false);
  const ShowEditProductModal = (id) => {
    axiosClient
      .get('/seller/product/' + id, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res) {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setImage(res.data.data.image);
          setStocks(res.data.data.stocks_per_kg);
          setPrice(res.data.data.price_per_kg);
          setProductId(id);
          setShowEditProduct(true);
        }
      });
  };

  const closeEditProductModal = () => {
    setShowEditProduct(false);
    setErrors([]);
  };

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

  // Submit Edit Form
  const handlePostEdit = (e) => {
    e.preventDefault();
   
    axiosClient
      .post('/seller/product/' + product_id, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.status == 200) {
          Notification({
            title: 'Success',
            message: res.data.message,
            icon: 'success',
          });
          setProductDataTable();
          closeEditProductModal();
        }
      })
      .catch((e) => {
        console.log(e);
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  // Submit Add Product
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
          closeCreateProductModal();
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
            <div key={i} className='button-actions d-flex'>
              <span
                onClick={() => viewProductDetails(product.id)}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-primary px-2 me-2 btn btn-primary'
              >
                View
              </span>
              <span
                onClick={() => ShowEditProductModal(product.id)}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-success px-2 me-2 btn'
              >
                Edit
              </span>
              <span
                onClick={() => deleteProduct(product.id)}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-danger px-2 me-2 btn'
              >
                Delete
              </span>
            </div>
          ),
        };
      });

      setBody(product);
    });
  }

  if (!user.verified_user) {
    navigate('/home');
  }

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImageDefault(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  }

  useEffect(() => {
    setProductDataTable();
    setImageDefault(PUBLIC_URL + 'images/' + 'default_profile.jpg');
  }, []);

  return (
    <>
      <div className='post_container mb-5'>
        <Container className='container_item px-5'>
          <H1>Products</H1>
          {/* Single View Product */}
          <Modal
            size='lg'
            show={showSpecificProduct}
            onHide={closeSpecificProductModal}
            centered
            keyboard
            scrollable
            contentClassName={'mt-0'}
          >
            <Modal.Header closeButton>
              <Modal.Title className='fw-bold'>View Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <div className='text-center mb-5'>
                  <img
                    src={PUBLIC_URL + 'images/' + showSpecificProductData.image}
                    style={{ width: '100px' }}
                    className='rounded'
                  />
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='d-flex flex-column mx-auto'>
                    <div>
                      <p className='text-secondary mb-0 fw-bold'>
                        Product Name
                      </p>
                      <p className='text-black'>
                        {showSpecificProductData.title}
                      </p>
                    </div>
                    <div>
                      <p className='text-secondary mb-0 fw-bold'>
                        Product Description
                      </p>
                      <p className='text-black'>
                        {showSpecificProductData.description}
                      </p>
                    </div>
                  </div>
                  <div className='d-flex flex-column mx-auto'>
                    <div>
                      <p className='text-secondary mb-0 fw-bold'>
                        Stocks (in kg)
                      </p>
                      <p className='text-black'>
                        {showSpecificProductData.stocks_per_kg}
                      </p>
                    </div>
                    <div>
                      <p className='text-secondary mb-0 fw-bold'>
                        {' '}
                        Price (per kg)
                      </p>
                      <p className='text-black'>
                        {showSpecificProductData.price_per_kg}
                      </p>
                    </div>
                  </div>
                </div>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                className='rounded'
                onClick={closeSpecificProductModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            size='lg'
            show={showCreateProduct}
            onHide={closeCreateProductModal}
            centered
            keyboard
            scrollable
            contentClassName={'mt-0'}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create New Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                id='createProductForm'
                onSubmit={handlePost}
                className='mb-5'
              >
                <Row>
                  <Col>
                    <Form.Group className='mt-2'>
                      <Form.Label className='text-black'>
                        Product Name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        className='form-control'
                        autoComplete='none'
                        value={title ? title : ''}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.title}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <Form.Label className='text-black'>
                        Product Image
                      </Form.Label>
                      <Form.Control
                        type='file'
                        className='form-control mb-3'
                        autoComplete='none'
                        onChange={onImageChange}
                        isInvalid={!!errors.image}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.image}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <img src={imageDefault} width={100} className='rounded' />
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
                            isInvalid={!!errors.stocks_per_kg}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.stocks_per_kg}
                          </Form.Control.Feedback>
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
                            isInvalid={!!errors.price_per_kg}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.price_per_kg}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                className='rounded'
                onClick={closeCreateProductModal}
              >
                Close
              </Button>
              <Button
                variant='primary'
                className='rounded'
                type='submit'
                form='createProductForm'
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>

          {/* edit Modal */}
          <Modal
            size='lg'
            show={showEditProduct}
            onHide={closeEditProductModal}
            centered
            keyboard
            scrollable
            contentClassName={'mt-0'}
          >
            <Modal.Header closeButton>
              <Modal.Title className='fw-bold'>Edit Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                id='editProductForm'
                onSubmit={handlePostEdit}
                className='mb-5'
              >
                <Row>
                  <Col>
                    <Form.Group className='mt-2'>
                      <Form.Label className='text-secondary fw-bold'>
                        Product Name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        className='form-control'
                        autoComplete='none'
                        value={title ? title : ''}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <Form.Label className='text-secondary fw-bold'>
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
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <Form.Label className='text-secondary fw-bold'>
                        Product Image
                      </Form.Label>
                      <Form.Control
                        type='file'
                        className='form-control mb-3'
                        autoComplete='none'
                        onChange={() => {}}
                        isInvalid={!!errors.image}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.image}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <img
                        src={PUBLIC_URL + 'images/' + image}
                        width={100}
                        className='rounded'
                      />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group className=''>
                          <Form.Label className='text-secondary fw-bold'>
                            Stocks (in kg)
                          </Form.Label>
                          <Form.Control
                            type='number'
                            className='form-control'
                            autoComplete='none'
                            value={stocks_per_kg ? stocks_per_kg : ''}
                            onChange={(e) => setStocks(e.target.value)}
                            isInvalid={!!errors.stocks_per_kg}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.stocks_per_kg}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className=''>
                          <Form.Label className='text-secondary fw-bold'>
                            Price (per kg)
                          </Form.Label>
                          <Form.Control
                            type='number'
                            className='form-control'
                            autoComplete='none'
                            value={price_per_kg ? price_per_kg : ''}
                            onChange={(e) => setPrice(e.target.value)}
                            isInvalid={!!errors.price_per_kg}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.price_per_kg}
                          </Form.Control.Feedback>

                          <Form.Control
                            type='hidden'
                            className='form-control'
                            value={product_id ? product_id : ''}
                            onChange={(e) => setProductId(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                className='rounded'
                onClick={closeEditProductModal}
              >
                Close
              </Button>
              <Button
                variant='primary'
                className='rounded'
                type='submit'
                form='editProductForm'
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>

          <TableComponent
            header={header}
            body={body}
            button={
              <Button
                variant='primary'
                className='rounded'
                onClick={showCreateProductModal}
              >
                Add Product
              </Button>
            }
          />
        </Container>
      </div>
      {/* <Card /> */}
      <Footer />
    </>
  );
};
