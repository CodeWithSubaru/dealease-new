import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useOrderContext from '../../Hooks/Context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    setDoneTransaction(true);
  }, []);

  return (
    <div className='mx-auto w-75'>
      <Card style={{ height: '85vh' }}>
        <h1 className='fw-bold mb-0 p-5 pb-0'>Payment Receipt</h1>
        <div className='d-flex justify-content-center align-items-center h-100 p-5 pt-0'>
          <div
            className='border-end border-2 border-info pe-3 w-50'
            style={{ height: '65vh', overflowY: 'auto' }}
          >
            <div className='border border-2 border-info rounded p-3 mb-5'>
              <h4 className='fw-light mb-3'> Customer Information</h4>
              <div className='d-flex justify-content-between'>
                <div>
                  <h6 className='fw-light mb-1 text-secondary'>
                    Customer Details
                  </h6>
                  <p>
                    {' '}
                    {user.first_name}{' '}
                    {user.user_details ? user.user_details.middle_name[0] : ''}{' '}
                    {'. '}{' '}
                    {user.user_details ? user.user_details.last_name : ''}{' '}
                    {user.user_details ? user.user_details.ext_name : ''}
                  </p>
                </div>
                <div>
                  <h6 className='fw-light text-secondary'>Payment Method</h6>
                  <p> Cash on Delivery (COD) - Php {grandTotal}</p>
                </div>
              </div>
              <div>
                <h6 className='fw-light mb-1 text-secondary'>Contact Number</h6>
                <p>
                  {Object.keys(otherAddress).length > 0
                    ? otherAddress.shippingFee.contact_number
                    : user.user_details.contact_number}
                </p>
              </div>
              <div>
                <h6 className='fw-light mb-1 text-secondary'>
                  Shipping Address
                </h6>
                {console.log('HERE', otherAddress)}
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
            {console.log('HERE', step2)}
            {Object.values(
              step2.cartHistoryBySellerId ? step2.cartHistoryBySellerId : step2
            ).map((item, index) => (
              <p key={index} className='p-2'>
                <strong>{item.length}</strong> item
                {item.length > 1 ? "'s" : ''} on Seller{' '}
                <strong>
                  {item.length > 1
                    ? item[index]
                      ? item[index].product.user.first_name
                      : ''
                    : item[0].product.user.first_name}{' '}
                  {item.length > 1
                    ? item[index]
                      ? item[index].product.user.user_details.middle_name[0] +
                        '. '
                      : ''
                    : item[0].product.user.user_details.middle_name[0] +
                      '. '}{' '}
                  {item.length > 1
                    ? item[index]
                      ? item[index].product.user.user_details.last_name
                      : ''
                    : item[0].product.user.user_details.last_name}{' '}
                  {item.length > 1
                    ? item[index]
                      ? item[index].product.user.user_details.ext_name
                      : ''
                    : item[0].product.user.user_details.ext_name}
                </strong>{' '}
                <br />
                <span className='fw-semibold'> Sub Total:</span>{' '}
                {calculateSubTotalPrice(item)}
                <p>
                  <span className='fw-semibold'> Delivery Fee: </span>{' '}
                  {20 * 1.5}
                </p>
              </p>
            ))}
            <div className='border border-2 border-info rounded p-3 bg-info bg-opacity-25 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='fw-semibold'>Total Order Amount</span>
                <span>{grandTotal} shells</span>
              </div>
            </div>

            <div className='d-flex justify-content-end'>
              <span className='d-block'>
                <Link
                  to='/home'
                  className='rounded px-3 me-2 text-decoration-none text-success'
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
          <div className='d-flex flex-column justify-content-center align-items-center ps-3 w-50'>
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
