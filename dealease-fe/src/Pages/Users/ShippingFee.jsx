import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import useOrderContext from '../../Hooks/Context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuthContext from '../../Hooks/Context/AuthContext';
import PUBLIC_URL from '../../api/public_url';
import { Button, Form } from 'react-bootstrap';
import useAddressContext from '../../Hooks/Context/AddressContext';
import { barangays } from 'select-philippines-address';
import axiosClient from '../../api/axios';
import { H3 } from '../../Components/Helpers/index.style';
import useAddToCartContext from '../../Hooks/Context/AddToCartContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ShippingFee() {
  const {
    step1,
    setStep1,
    setStep2,
    grandTotal,
    setGrandTotal,
    isDoneTransaction,
    setDoneTransaction,
  } = useOrderContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [shippingFeeData, setShippingFeeData] = useState({});
  const [viewShippingAddressForm, setViewShippingAddressForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [barangaysData, setBarangaysData] = useState([]);
  const { fetchCountInItemsCart } = useAddToCartContext();

  if (isDoneTransaction) {
    navigate('../home');
  }

  const attributes = {
    form: 'shippingForm',
  };

  const attributes1 = {
    onClick: (e) => {
      e.preventDefault();
      const cartHistoryBySellerId = step1;

      axiosClient
        .post('/orders/place-order', { cartHistoryBySellerId })
        .then((res) => {
          setStep2(step1);
          setDoneTransaction(true);
          navigate('../successful');
        })
        .catch((e) => console.log(e));
      setStep2(step1);
    },
  };
  function barangay(e) {
    console.log(e.target.selectedOptions[0].text);
    setShippingFeeData({
      ...shippingFeeData,
      barangay: e.target.selectedOptions[0].text,
    });
  }

  if (step1.length === 0) {
    return navigate('../add-to-cart');
  }

  function fetchCartHistoryBySellerId() {
    axiosClient
      .get('orders/seller-id')
      .then((res) => {
        setStep1(res.data);
      })
      .catch((e) => console.log(e));
  }

  function removeFromCart(id) {
    axiosClient.delete('/orders/' + id).then((res) => {
      fetchCartHistoryBySellerId();

      fetchCountInItemsCart();
    });
  }

  function increment(id) {
    axiosClient
      .get('/orders/increment/' + id)
      .then((res) => {
        fetchCartHistoryBySellerId();
      })
      .catch((e) => console.log(e));
  }

  function decrement(id) {
    axiosClient
      .get('/orders/decrement/' + id)
      .then((res) => {
        fetchCartHistoryBySellerId();
      })
      .catch((e) => console.log(e));
  }

  function calculateSubTotalPrice(item) {
    let totalPrice = 0;
    for (let i = 0; i < item.length; i++) {
      totalPrice += Number(item[i].total_price);
    }
    return Number(totalPrice).toLocaleString('en-US');
  }

  function calculateGrandTotalPrice(cart) {
    let totalPrice = 0;
    Object.values(cart).forEach((cartItem) => {
      for (let i = 0; i < cartItem.length; i++) {
        totalPrice += Number(cartItem[i].total_price);
      }
    });

    return Number(totalPrice + 20 * 1.5 * Object.keys(cart).length);
  }

  useEffect(() => {
    barangays('031414').then((barangay) => setBarangaysData(barangay));
  }, []);

  return (
    <Card className='mx-auto w-75' style={{ height: '85vh' }}>
      <div className='p-5'>
        <h1 className='fw-bolder fs-1 mb-4'>Shipping</h1>
        <div className='d-flex' style={{ height: '65vh' }}>
          <div
            className='border-end border-2 border-info w-50 pe-3'
            style={{ height: '65vh', overflowY: 'auto' }}
          >
            <div className='border border-2 border-info rounded p-3 mb-5'>
              <div className='d-flex'>
                <span className='w-25 text-secondary'> Contact</span>
                <span>
                  {' '}
                  {user.first_name}{' '}
                  {user.user_details ? user.user_details.middle_name[0] : ''}{' '}
                  {'. '} {user.user_details ? user.user_details.last_name : ''}{' '}
                  {user.user_details ? user.user_details.ext_name : ''}
                </span>
                <div></div>
              </div>
              <hr className='border border-1 border-info rounded' />
              <div className='d-flex'>
                <span className='w-25 text-secondary'>Delivery Address</span>
                <span className='w-50'>
                  {user.user_details ? user.user_details.street : ''}{' '}
                  {user.user_details ? user.user_details.barangay : ''}{' '}
                  {user.user_details ? user.user_details.city : ''}
                </span>
                <Link
                  className='flex-grow-1 d-flex justify-content-end align-items-center text-secondary'
                  style={{ fontSize: '14px' }}
                  onClick={() => {
                    viewShippingAddressForm
                      ? setViewShippingAddressForm(false)
                      : setViewShippingAddressForm(true);
                  }}
                >
                  {viewShippingAddressForm
                    ? 'Use Current Address'
                    : 'Use Different Address'}
                </Link>
              </div>
            </div>

            {viewShippingAddressForm && (
              <div className='border border-2 border-info rounded p-3 mb-5'>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShippingFeeData({ ...shippingFeeData, city: 'Obando' });
                    const shippingFee = shippingFeeData;
                    const cartHistoryBySellerId = step1;
                    const data = {
                      shippingFee,
                      cartHistoryBySellerId,
                    };

                    axiosClient
                      .post('/orders/place-order', data)
                      .then((res) => {
                        setStep2(data);
                        setDoneTransaction(true);
                        navigate('../successful');
                      })
                      .catch((e) => console.log(e));
                  }}
                  id='shippingForm'
                >
                  <h3 className='mb-3'>Shipping Address</h3>

                  <div className='d-flex mb-3'>
                    <Form.Group className='flex-grow-1 me-2'>
                      <Form.Label className='text-dark'>City * </Form.Label>
                      <Form.Select defaultValue='Obando'>
                        <option value={'Obando'}>Obando</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className='flex-grow-1'>
                      <Form.Label className='text-dark'>Barangay *</Form.Label>
                      <Form.Select
                        onChange={barangay}
                        className='form-select'
                        isInvalid={!!errors.barangay}
                      >
                        {barangaysData.length > 0 &&
                          barangaysData.map((item) => (
                            <option key={item.brgy_code} value={item.brgy_code}>
                              {item.brgy_name}
                            </option>
                          ))}
                      </Form.Select>
                      {errors && errors.barangay ? (
                        <Form.Control.Feedback type='invalid'>
                          {errors.barangay}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>

                  <Form.Group className='mb-3'>
                    <Form.Label className='text-dark'>Street</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) =>
                        setShippingFeeData({
                          ...shippingFeeData,
                          street: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label className='text-dark text-secondary'>
                      Contact Number
                    </Form.Label>
                    <div className='position-relative'>
                      <Form.Control
                        type='text'
                        onChange={(e) =>
                          setShippingFeeData({
                            ...shippingFeeData,
                            contact_number: e.target.value,
                          })
                        }
                      />
                      <OverlayTrigger
                        delay={{ show: 150, hide: 400 }}
                        overlay={
                          <Tooltip>
                            In case we need to contact you about your order
                          </Tooltip>
                        }
                      >
                        <FontAwesomeIcon
                          icon={faCircleQuestion}
                          className='position-absolute text-primary'
                          style={{ top: '10px', right: '10px' }}
                        />
                      </OverlayTrigger>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            )}
            <div className='border border-2 border-info rounded p-3 bg-info bg-opacity-25 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='fw-semibold'>Total Order Amount</span>
                <span>{calculateGrandTotalPrice(step1)} shells</span>
              </div>
            </div>

            <div className='d-flex justify-content-between'>
              <Link
                to='../add-to-cart'
                className='text-decoration-none text-opacity-25 d-flex align-items-center'
              >
                {'< Return to cart'}
              </Link>

              <OverlayTrigger
                overlay={
                  calculateGrandTotalPrice(step1) >
                  Number(user.wallet.shell_coin_amount) ? (
                    <Tooltip id='tooltip-disabled'>
                      Insufficient Coin Amount. Please recharge
                    </Tooltip>
                  ) : (
                    <></>
                  )
                }
              >
                <span className='d-block'>
                  <Button
                    variant='success'
                    className='rounded px-3'
                    {...(viewShippingAddressForm
                      ? { ...attributes }
                      : { ...attributes1 })}
                    type='submit'
                    disabled={
                      calculateGrandTotalPrice(step1) >
                      Number(user.wallet.shell_coin_amount)
                    }
                    style={{
                      pointerEvents:
                        calculateGrandTotalPrice(step1) >
                        Number(user.wallet.shell_coin_amount)
                          ? 'none'
                          : 'auto',
                    }}
                  >
                    Proceed To Checkout
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
          </div>
          <div
            className='w-50 ps-3'
            style={{ height: '65vh', overflowY: 'auto' }}
          >
            {Object.values(step1).length > 0
              ? Object.values(step1).map((item, index) => {
                  return (
                    <div>
                      <p className='mb-0' key={index}>
                        Seller{' '}
                        <span className='badge rounded-pill text-bg-primary'>
                          {item.length > 1
                            ? item[index]
                              ? item[index].product.user.first_name +
                                ' ' +
                                item[index].product.user.user_details
                                  .middle_name[0] +
                                '.' +
                                ' ' +
                                item[index].product.user.user_details.last_name
                              : ''
                            : item[0].product.user.first_name +
                              ' ' +
                              item[0].product.user.user_details.middle_name[0] +
                              '.' +
                              ' ' +
                              item[0].product.user.user_details.last_name}
                        </span>
                      </p>
                      {item.map((cartItem, index) => (
                        <>
                          <Card
                            className='d-flex flex-row flex-xs-column w-100 p-2 mb-3 mt-2'
                            key={index}
                          >
                            <div
                              style={{
                                width: '120px',
                                height: '120px',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={
                                  PUBLIC_URL +
                                  'images/' +
                                  cartItem.product.image
                                }
                                alt={
                                  cartItem.product.image
                                    ? cartItem.product.image
                                    : ''
                                }
                                style={{
                                  objectFit: 'cover',
                                }}
                                className='rounded w-100 h-100'
                              />
                            </div>
                            <div className='flex-grow-1 d-flex justify-content-between ms-3'>
                              <div>
                                <H3 className='fs-3 '>
                                  {cartItem.product.title}
                                </H3>
                                <div className='d-flex flex-column text-secondary'>
                                  <span>
                                    Price: Php {cartItem.product.price_per_kg}
                                  </span>
                                  <span>
                                    Available Stocks :{' '}
                                    {cartItem.product.stocks_per_kg} kg
                                  </span>
                                </div>
                              </div>
                              <div className='flex-shrink-0 align-self-end justify-content-end'>
                                <div className='d-flex align-items-end justify-content-end'>
                                  <Button
                                    variant='primary'
                                    className='w-25 py-2 px-0 me-2 rounded'
                                    onClick={() => decrement(cartItem.id)}
                                    disabled={cartItem.weight == 1}
                                  >
                                    -
                                  </Button>
                                  <input
                                    type='text'
                                    className='w-25 py-1 text-center'
                                    value={cartItem.weight}
                                    disabled
                                  />
                                  <Button
                                    variant='primary'
                                    className='w-25 py-2 px-0 ms-2 rounded me-2'
                                    onClick={() => increment(cartItem.id)}
                                    disabled={
                                      cartItem.product.stocks_per_kg <=
                                      cartItem.weight
                                    }
                                  >
                                    +
                                  </Button>

                                  <Button
                                    className='btn btn-danger rounded'
                                    onClick={() => removeFromCart(cartItem.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </>
                      ))}
                      <p className='mb-1'>
                        <span className='fw-semibold '> Sub Total:</span> Php{' '}
                        {calculateSubTotalPrice(item)}
                      </p>
                      <p>
                        <span className='fw-semibold'> Delivery Fee: </span>{' '}
                        {20 * 1.5}
                      </p>
                    </div>
                  );
                })
              : ''}
            <div className='mt-5'>
              <hr />
              <p className='fs-4 fw-bold mt-2 d-flex align-items-center text-secondary'>
                {' '}
                Grand Total:{' '}
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  alt=''
                  className='mx-1'
                />{' '}
                {calculateGrandTotalPrice(step1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
