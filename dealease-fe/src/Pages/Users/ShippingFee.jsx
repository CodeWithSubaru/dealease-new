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

export function ShippingFee() {
  const { step1, setStep2, grandTotal } = useOrderContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [shippingFeeData, setShippingFeeData] = useState({});
  const [viewShippingAddressForm, setViewShippingAddressForm] = useState(false);
  const { cityData, getBarangay } = useAddressContext();
  const [errors, setErrors] = useState([]);
  const [barangaysData, setBarangaysData] = useState([]);
  const attributes = {
    form: 'shippingForm',
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
                <span className='w-25 text-secondary'>Shiping To</span>
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
                    console.log('TRIGGERED');
                    // setStep2(step1);
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
                        onChange={(e) => barangay(e)}
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
                    <Form.Control type='text' />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label className='text-dark'>Cellphone</Form.Label>
                    <Form.Control type='text' />
                  </Form.Group>
                </Form>
              </div>
            )}
            <div className='border border-2 border-info rounded p-3 bg-info bg-opacity-25 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='fw-semibold'>Shipping Fee</span>
                <span>Php {Number(grandTotal).toFixed(2)}</span>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <Link
                to='../add-to-cart'
                className='text-decoration-none text-opacity-25 d-flex align-items-center'
              >
                {'< Return to cart'}
              </Link>
              <Button
                variant='primary'
                className='rounded px-3'
                {...(viewShippingAddressForm
                  ? { ...attributes }
                  : console.log('HI'))}
                type='submit'
              >
                Continue to Payment
              </Button>
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
                                <h3 className='fs-3'>
                                  {cartItem.product.title}
                                </h3>
                                <div className='d-flex flex-column'>
                                  <span>
                                    Price: Php {cartItem.product.price_per_kg}
                                  </span>
                                  <span>
                                    Available Stocks :{' '}
                                    {cartItem.product.stocks_per_kg} kg
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </>
                      ))}
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    </Card>
  );
}
