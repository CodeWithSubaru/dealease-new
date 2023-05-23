import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useOrderContext from '../../Hooks/Context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { H1 } from '../../Components/Helpers/index.style';

export function SuccessfulUser() {
  const { user } = useAuthContext();
  const {
    step1,
    step2,
    setStep1,
    setStep2,
    grandTotal,
    setGrandTotal,
    setDoneTransaction,
    otherAddress,
  } = useOrderContext();
  const navigate = useNavigate();

  if (step1.length == 0 && step2.length == 0) {
    return navigate('../shipping');
  }

  function calculateSubTotalPrice(item) {
    let totalPrice = 0;
    for (let i = 0; i < item.length; i++) {
      totalPrice += Number(item[i].total_price);
    }
    return Number(totalPrice).toLocaleString('en-US');
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

  function calculateGrandTotalDeliveryFee(cart, delFee) {
    let totalPrice = 0;
    Object.values(cart).forEach((cartItem) => {
      for (let i = 0; i < cartItem.length; i++) {
        totalPrice += Number(cartItem[i].total_price) + Number(0);
      }
    });
    return Number(totalPrice);
  }

  return (
    <div className='mx-2 shadow mt-3 py-4'>
      <Card className='mt-3' style={{ minHeight: '85vh' }}>
        <H1 className='fw-bold mb-0 p-4 pb-0 fs-2'>Payment Receipt</H1>
        <div className='d-flex flex-column justify-content-center align-items-center h-100 pt-0'>
          <div className=''>
            <div className='border border-2 border-info rounded p-3 mb-5'>
              <h4 className='fw-light mb-3'> Customer Information</h4>
              <div className='d-flex justify-content-between'>
                <div>
                  <h6 className='fw-semibold text-secondary'>
                    Customer Details
                  </h6>
                  <p>
                    {' '}
                    {Object.keys(otherAddress).length > 0
                      ? otherAddress.shippingFee.full_name
                      : user.user_details.first_name +
                        ' ' +
                        (user.user_details.middle_name
                          ? user.user_details.middle_name[0] + '. '
                          : '') +
                        ' ' +
                        (user.user_details ? user.user_details.last_name : '') +
                        ' ' +
                        (user.user_details.ext_name
                          ? user.user_details.ext_name
                          : '')}
                  </p>
                </div>
                <div className='mb-3'>
                  <h6 className='fw-semibold text-secondary'>Payment Method</h6>
                  <p className='d-flex align-items-center'>
                    {' '}
                    Shells E-Wallet -{' '}
                    <img
                      src='/images/seashell.png'
                      height={25}
                      width={25}
                      alt=''
                      className='mx-2'
                    />{' '}
                    {calculateGrandTotalDeliveryFee(
                      step1,
                      changeDeliveryFeePerBrgy(
                        Object.keys(otherAddress).length > 0
                          ? otherAddress.shippingFee.barangay
                          : user.user_details.barangay
                      )
                    )}
                  </p>
                </div>
              </div>
              <div className='mb-3'>
                <h6 className='fw-semibold text-secondary'>Contact Number</h6>
                <p>
                  {Object.keys(otherAddress).length > 0
                    ? otherAddress.shippingFee.contact_number
                    : user.user_details.contact_number}
                </p>
              </div>
              <div>
                <h6 className='fw-semibold text-secondary'>Shipping Address</h6>

                {Object.keys(otherAddress).length > 0 ? (
                  <>
                    <span className='d-block'>
                      {otherAddress.shippingFee.street}
                    </span>
                    <span className='d-block'>
                      {otherAddress.shippingFee.barangay}
                    </span>
                  </>
                ) : (
                  <>
                    <span className='d-block'>
                      {user.user_details
                        ? user.user_details.street
                          ? user.user_details.street
                          : ''
                        : ''}
                    </span>
                    <span className='d-block'>
                      {user.user_details
                        ? user.user_details.barangay
                          ? user.user_details.barangay
                          : ''
                        : ''}
                    </span>
                  </>
                )}
                <span className='d-block'>Obando</span>
                <span className='d-block'>Bulacan</span>
                <span className='d-block'>Region III (Central Luzon)</span>
              </div>
            </div>
            {Object.values(
              step2.cartHistoryBySellerId ? step2.cartHistoryBySellerId : step2
            ).map((item, index) => (
              <p key={index} className='p-2'>
                <strong>{item.length}</strong> item
                {item.length > 1 ? "'s" : ''} on Seller{' '}
                <strong>
                  {item.length > 1
                    ? item[index]
                      ? item[index].product.user.user_details.first_name
                      : ''
                    : item[0].product.user.user_details.first_name}{' '}
                  {item.length > 1
                    ? item[index].product.user.user_details.middle_name
                      ? item[index].product.user.user_details.middle_name[0] +
                        '. '
                      : ''
                    : item[0].product.user.user_details.middle_name
                    ? item[0].product.user.user_details.middle_name[0] + '. '
                    : ''}{' '}
                  {item.length > 1
                    ? item[index]
                      ? item[index].product.user.user_details.last_name
                      : ''
                    : item[0].product.user.user_details.last_name}{' '}
                  {item.length > 1
                    ? item[index].product.user.user_details.ext_name
                      ? item[index].product.user.user_details.ext_name
                      : ''
                    : item[0].product.user.user_details.ext_name}
                </strong>{' '}
                <br />
                <span className='fw-semibold'> Sub Total:</span>{' '}
                {calculateSubTotalPrice(item)}
              </p>
            ))}
            <div className='border border-2 border-info rounded p-3 bg-info bg-opacity-25 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='fw-semibold'>Total Order Amount</span>
                <span className='d-flex align-items-center'>
                  <img
                    src='/images/seashell.png'
                    height={25}
                    width={25}
                    alt=''
                    className='mx-2'
                  />{' '}
                  {calculateGrandTotalDeliveryFee(step1)}
                </span>
              </div>
            </div>

            <div className='d-flex justify-content-end'>
              <span className='d-flex align-items-center'>
                <Link
                  to='/home'
                  className='rounded x-3 me-2 text-decoration-none text-success text-nowrap'
                  type='submit'
                >
                  Shop Again
                </Link>

                <Link
                  to='/orders'
                  className='btn btn-primary text-light rounded px-3'
                  type='submit'
                >
                  My Orders
                </Link>
              </span>
            </div>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center ps-3 my-5'>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className='text-success mb-2'
              style={{ fontSize: '70px' }}
            />
            <h1 className='fw-semibold capitalize mb-3'>Successful</h1>
            <p className='mb-0'>Your order is on pending.</p>
            <p>Please wait for the confirmation of Seller</p>
            <hr />
          </div>
        </div>
      </Card>
    </div>
  );
}
