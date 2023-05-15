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
import { Load } from '../../Components/Loader/Load';
import {
  Finalize,
  Finalize1,
} from '../../Components/Notification/Notification';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function ShippingFee() {
  const {
    step1,
    setStep1,
    setStep2,
    grandTotal,
    setGrandTotal,
    setOtherAddress,
    isDoneTransaction,
    setDoneTransaction,
  } = useOrderContext();
  const navigate = useNavigate();
  const { user, fetchUserInfo } = useAuthContext();
  const [barangayForm, setBarangay] = useState('');
  const [street, setStreet] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [viewShippingAddressForm, setViewShippingAddressForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [barangaysData, setBarangaysData] = useState([]);
  const { fetchCountInItemsCart } = useAddToCartContext();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);

  if (isDoneTransaction) {
    navigate('../home');
  }

  const attributes = {
    form: 'shippingForm',
  };

  const attributes1 = {
    onClick: (e) => {
      e.preventDefault();

      Finalize({
        confirmButton: 'Yes, Place my order',
        text: 'Are you sure you want to place order. It will deduct to your shell wallet',
        successMsg: 'Your Order Placed Successfully.',
        errorMsg: 'Something went wrong!',
        status: 'Success!',
        statusmsg: 'success',
      }).then((res) => {
        if (res.isConfirmed) {
          const cartHistoryBySellerId = step1;
          setLoading(true);
          axiosClient
            .post('/orders/place-order', { cartHistoryBySellerId })
            .then((res) => {
              setOtherAddress({});
              setStep2(step1);
              setDoneTransaction(true);
              fetchCountInItemsCart();
              fetchUserInfo();
              setLoading(false);
              navigate('../successful');
            });
          setStep2(step1);
        }
      });
    },
  };
  function barangay(e) {
    console.log(e.target.selectedOptions[0].text);
    setBarangay(e.target.selectedOptions[0].text);
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

  function calculateGrandTotalDeliveryFee(cart, delFee) {
    let totalPrice = 0;
    Object.values(cart).forEach((cartItem) => {
      for (let i = 0; i < cartItem.length; i++) {
        totalPrice += Number(cartItem[i].total_price) + Number(delFee);
      }
    });
    return Number(totalPrice);
  }

  function changeDeliveryFeePerBrgy(df) {
    let rate = 0;
    if (df === 'Paliwas' || df === 'Salambao' || df === 'Binuangan') {
      rate = 20;
    } else if (df === 'Pag-asa' || df === 'San Pascual') {
      rate = 25;
    } else if (df === 'Catanghalan' || df === 'Hulo') {
      rate = 30;
    } else if (df === 'Panghulo' || df === 'Lawa') {
      rate = 35;
    } else if (df === 'Paco') {
      rate = 40;
    } else if (df === 'Tawiran') {
      rate = 45;
    }
    return rate;
  }

  useEffect(() => {
    barangays('031414').then((barangay) => setBarangaysData(barangay));
  }, []);

  return (
    <Card className='mx-auto w-75' style={{ height: '85vh' }}>
      {loading ? (
        <Load />
      ) : (
        <div className='p-5'>
          <h1 className='fw-bolder fs-1 mb-4'>Shipping</h1>
          <div className='d-flex' style={{ height: '65vh' }}>
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
                                  item[index].product.user.user_details
                                    .last_name
                                : ''
                              : item[0].product.user.first_name +
                                ' ' +
                                (item[0].product.user.user_details.middle_name
                                  ? item[0].product.user.user_details
                                      .middle_name[0] + '. '
                                  : '') +
                                (item[0].product.user.user_details.last_name
                                  ? item[0].product.user.user_details.last_name
                                  : '')}
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
                                      onClick={() =>
                                        removeFromCart(cartItem.id)
                                      }
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
                  {calculateGrandTotalDeliveryFee(
                    step1,
                    changeDeliveryFeePerBrgy(
                      barangayForm ? barangayForm : user.user_details.barangay
                    )
                  )}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div
              className='border-start border-2 border-info w-50 px-3 ms-2'
              style={{ height: '65vh', overflowY: 'auto' }}
            >
              <Link
                to='../add-to-cart'
                className='text-decoration-none text-opacity-25 d-flex align-items-center mb-2'
              >
                {'< Return to cart'}
              </Link>
              <div className='border border-2 border-info rounded p-3 mb-5'>
                <div className='d-flex'>
                  <span className='w-25 text-secondary'> Deliver to</span>
                  <span>
                    {' '}
                    {user.first_name}{' '}
                    {user.user_details.middle_name
                      ? user.user_details.middle_name[0]
                      : ''}{' '}
                    {user.user_details ? user.user_details.last_name : ''}{' '}
                    {user.user_details.ext_name
                      ? user.user_details.ext_name
                      : ''}
                  </span>
                  <div></div>
                </div>
                <hr className='border border-1 border-info rounded' />
                <div className='d-flex'>
                  <span className='w-25 text-secondary'> Contact #</span>
                  <span>{user.user_details.contact_number} </span>
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
                    className='flex-grow-1 d-flex justify-content-end align-items-center text-secondary flex-shrink-0'
                    style={{ fontSize: '14px' }}
                    onClick={() => {
                      viewShippingAddressForm
                        ? setViewShippingAddressForm(false)
                        : setViewShippingAddressForm(true);
                      setBarangay('');
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
                      Finalize1({
                        confirmButton: 'Yes, Place my order',
                        text: 'Are you sure you want to place order. It will deduct to your shell wallet',
                        successMsg: 'Your Order Placed Successfully.',
                      }).then((res) => {
                        if (res.isConfirmed) {
                          setLoading(true);
                          const cartHistoryBySellerId = step1;

                          const data = {
                            shippingFee: {
                              full_name: fullName,
                              barangay: barangayForm,
                              street: street,
                              contact_number: contactNumber,
                            },
                            cartHistoryBySellerId,
                          };

                          setOtherAddress(data);
                          axiosClient
                            .post('/orders/place-order', data)
                            .then((res) => {
                              MySwal.fire(
                                'Success!',
                                'Order has been replaced',
                                'success'
                              );
                              setStep2(data);
                              setDoneTransaction(true);
                              setLoading(false);
                              fetchCountInItemsCart();
                              fetchUserInfo();
                              setBarangay('');
                              setStreet('');
                              setContactNumber('');
                              navigate('../successful');
                            })
                            .catch((e) => {
                              MySwal.fire('Error!', 'Errors Found', 'error');
                              setErrors(e.response.data.errors);
                              setLoading(false);
                            });
                        }
                      });
                    }}
                    id='shippingForm'
                  >
                    <h3 className=''>Shipping Address</h3>
                    <p className='text-secondary mb-3'>
                      Please fill up the form.
                    </p>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-dark'> Full Name </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={(e) => setFullName(e.target.value)}
                        isInvalid={!!errors['shippingFee.full_name']}
                      />

                      {errors['shippingFee.full_name'] ? (
                        <Form.Control.Feedback type='invalid'>
                          {errors['shippingFee.full_name'][0]}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>

                    <div className='d-flex mb-3'>
                      <Form.Group className='flex-grow-1 me-2'>
                        <Form.Label className='text-dark'>
                          City / Town{' '}
                        </Form.Label>
                        <Form.Control type='text' value={'Obando'} disabled />
                      </Form.Group>

                      <Form.Group className='flex-grow-1'>
                        <Form.Label className='text-dark'>
                          Barangay *
                        </Form.Label>
                        <Form.Select
                          onChange={barangay}
                          className='form-select'
                          defaultValue={'default'}
                          isInvalid={!!errors['shippingFee.barangay']}
                        >
                          <option value={'default'} disabled>
                            Select Barangay
                          </option>
                          {barangaysData.length > 0 &&
                            barangaysData.map((item) => (
                              <>
                                <option
                                  key={item.brgy_code}
                                  value={item.brgy_code}
                                >
                                  {item.brgy_name}
                                </option>
                              </>
                            ))}
                        </Form.Select>
                        {errors['shippingFee.barangay'] ? (
                          <Form.Control.Feedback type='invalid'>
                            {errors['shippingFee.barangay'][0]}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </div>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-dark'>Street</Form.Label>
                      <Form.Control
                        type='text'
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                        isInvalid={errors['shippingFee.street']}
                      />

                      {errors['shippingFee.street'] ? (
                        <Form.Control.Feedback type='invalid'>
                          {errors['shippingFee.street'][0]}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-dark text-secondary'>
                        Contact Number
                      </Form.Label>
                      <div className='position-relative'>
                        <Form.Control
                          type='text'
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          isInvalid={!!errors['shippingFee.contact_number']}
                        />
                        {errors['shippingFee.contact_number'] ? (
                          <Form.Control.Feedback type='invalid'>
                            {errors['shippingFee.contact_number'][0]}
                          </Form.Control.Feedback>
                        ) : null}
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
                {Object.values(step1).length > 0 &&
                  Object.values(step1).map((item, index) => {
                    return (
                      <>
                        <div>
                          <p className='mb-0' key={index}>
                            <span className='badge rounded-pill bg-primary'>
                              {item.length > 1
                                ? item[index]
                                  ? item[index].product.user.first_name +
                                    ' ' +
                                    item[index].product.user.user_details
                                      .middle_name[0] +
                                    '.' +
                                    item[index].product.user.user_details
                                      .last_name
                                  : ''
                                : item[0].product.user.first_name +
                                  ' ' +
                                  (item[0].product.user.user_details.middle_name
                                    ? item[0].product.user.user_details
                                        .middle_name[0] + '. '
                                    : '') +
                                  (item[0].product.user.user_details.last_name
                                    ? item[0].product.user.user_details
                                        .last_name
                                    : '')}
                            </span>
                          </p>
                          <div>
                            {item.map((cartItem, index) => (
                              <div key={index}>
                                <div className=''>
                                  <table className='w-100'>
                                    <tr>
                                      <td className='fw-bold text-secondary w-25'>
                                        {' '}
                                        Name{' '}
                                      </td>
                                      <td className='fw-bold text-secondary text-center'>
                                        {' '}
                                        Weight{' '}
                                      </td>
                                      <td className='fw-bold text-secondary text-end'>
                                        Price
                                      </td>
                                    </tr>

                                    <tr>
                                      <td className='d-flex ms-3'>
                                        {cartItem.product.title}
                                      </td>
                                      <td className='text-center'>
                                        {cartItem.weight} kg
                                      </td>
                                      <td className='text-end'>
                                        <img
                                          src='/images/seashell.png'
                                          height={15}
                                          width={15}
                                          alt=''
                                          className=''
                                        />{' '}
                                        {cartItem.product.price_per_kg}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td className='d-flex ms-3'>
                                        {' '}
                                        Delivery Fee
                                      </td>
                                      <td></td>
                                      <td className='text-end'>
                                        <img
                                          src='/images/seashell.png'
                                          height={15}
                                          width={15}
                                          alt=''
                                          className=''
                                        />{' '}
                                        <span>
                                          {changeDeliveryFeePerBrgy(
                                            barangayForm
                                              ? barangayForm
                                              : user.user_details.barangay
                                          )}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='d-flex ms-3'>Sub Total</td>
                                      <td></td>
                                      <td className='text-end'>
                                        <img
                                          src='/images/seashell.png'
                                          height={15}
                                          width={15}
                                          alt=''
                                          className=''
                                        />{' '}
                                        {calculateSubTotalPrice(item)}
                                      </td>
                                    </tr>
                                    <br />
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })}
                <hr />
                <div className='d-flex justify-content-between'>
                  <span className='fw-semibold'>Total Order Amount</span>
                  <span className='d-flex align-items-center'>
                    <img
                      src='/images/seashell.png'
                      height={15}
                      width={15}
                      alt=''
                      className=''
                    />{' '}
                    <span className='ms-1'>
                      {calculateGrandTotalDeliveryFee(
                        step1,
                        changeDeliveryFeePerBrgy(
                          barangayForm
                            ? barangayForm
                            : user.user_details.barangay
                        )
                      )}
                    </span>
                  </span>
                </div>
              </div>

              <div className='d-flex'>
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
                  <span className='d-block flex-grow-1'>
                    <Button
                      variant='success'
                      className='rounded w-100'
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
          </div>
        </div>
      )}
    </Card>
  );
}
