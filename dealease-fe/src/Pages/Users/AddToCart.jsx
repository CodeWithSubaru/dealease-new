import { Card } from 'react-bootstrap';
import { Footer } from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button';
import { H1, H3 } from '../../Components/Helpers/index.style';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PUBLIC_URL from '../../api/public_url';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axios';
import useAddToCartContext from '../../Hooks/Context/AddToCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup } from 'rsuite';
import {
  faEye,
  faEdit,
  faTrash,
  faFishFins,
  faSheqel,
  faTable,
  faBars,
  faPlus,
  faClose,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';

import {
  Notification,
  Finalize,
} from '../../Components/Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import useOrderContext from '../../Hooks/Context/OrderContext';
import { Load } from '../../Components/Loader/Load';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';
import React from 'react';
import CloseIcon from '@rsuite/icons/Close';

export function AddToCart() {
  const [cartHistoryBySellerId, setCartHistoryBySellerId] = useState([]);

  const { countItemsInCart, fetchCountInItemsCart } = useAddToCartContext();
  const { setStep1, setGrandTotal } = useOrderContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleMinus = () => {
    setValue(parseInt(value, 10) - 1);
  };
  const handlePlus = () => {
    setValue(parseInt(value, 10) + 1);
  };

  function fetchCartHistoryBySellerId() {
    axiosClient
      .get('orders/seller-id')
      .then((res) => {
        setCartHistoryBySellerId(res.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
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

    return Number(totalPrice);
  }

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get('orders/seller-id')
      .then((res) => {
        setLoading(false);
        setCartHistoryBySellerId(res.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarUser />
        <main className=' w-100'>
          <Card className=' card-add-to-cart'>
            {loading ? (
              <div className='addtocart-container p-3 h-100 mx-2'>
                <Card.Header className='d-flex justify-content-between'>
                  <H1 className='text-home pt-2'>
                    Your Cart [
                    {countItemsInCart === 9 ? '9+' : countItemsInCart}]
                  </H1>
                  <Link
                    className='btn btn-primary my-auto text-decoration-none w-auto rounded desktopaddcart'
                    to='/home'
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </Link>
                </Card.Header>
                <Link
                  className='btn btn-primary my-auto text-decoration-none rounded mobileaddcart'
                  to='/home'
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </Link>
                <div
                  className=' rounded pt-0'
                  style={{ height: '50vh', overflowY: 'auto' }}
                >
                  <Load />
                </div>
              </div>
            ) : (
              <div className='addtocart-container p-3 h-100 mx-2'>
                <Card.Header className='d-flex justify-content-between'>
                  <H1 className='text-home pt-2'>
                    Your Cart [
                    {countItemsInCart === 9 ? '9+' : countItemsInCart}]
                  </H1>
                  <Link
                    className='btn btn-primary my-auto text-decoration-none w-auto rounded desktopaddcart'
                    to='/home'
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </Link>
                </Card.Header>
                <Link
                  className='btn btn-primary my-auto text-decoration-none rounded mobileaddcart'
                  to='/home'
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </Link>
                <div
                  className=' rounded pt-0'
                  style={{ height: '70vh', overflowY: 'auto' }}
                >
                  <div className='d-flex flex-wrap h-100'>
                    <div className='flex-grow-1 me-2'>
                      {Object.values(cartHistoryBySellerId).length > 0 ? (
                        Object.values(cartHistoryBySellerId).map(
                          (item, index) => {
                            return (
                              <>
                                <p className='mb-0 mt-4' key={index}>
                                  Seller{' '}
                                  <span className='badge rounded-pill text-bg-primary'>
                                    {item.length > 1
                                      ? item[index]
                                        ? item[index].product.user.user_details
                                            .first_name
                                        : ''
                                      : item[0].product.user.user_details
                                          .first_name}{' '}
                                    {item.length > 1
                                      ? item[index].product.user.user_details
                                          .middle_name
                                        ? item[index].product.user.user_details
                                            .middle_name[0] + '. '
                                        : ''
                                      : item[0].product.user.user_details
                                          .middle_name
                                      ? item[0].product.user.user_details
                                          .middle_name[0] + '. '
                                      : ''}{' '}
                                    {item.length > 1
                                      ? item[index].product.user.user_details
                                          .last_name
                                        ? item[index].product.user.user_details
                                            .last_name
                                        : ''
                                      : item[0].product.user.user_details
                                          .last_name}{' '}
                                    {item.length > 1
                                      ? item[index].product.user.user_details
                                          .ext_name
                                        ? item[index].product.user.user_details
                                            .ext_name
                                        : ''
                                      : item[0].product.user.user_details
                                          .ext_name}
                                  </span>
                                </p>
                                {item.map((cartItem, index) => (
                                  <>
                                    <Card
                                      className='d-flex flex-row p-2 mb-3 mt-2 border border-1 border-dark-subtle'
                                      key={index}
                                    >
                                      <div className='addcartproductimgcontainer'>
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
                                          className='rounded addcartproductimg'
                                        />
                                      </div>
                                      <div className='flex-grow-1 d-flex justify-content-between ms-3'>
                                        <div>
                                          <div className='d-flex flex-column'>
                                            <H3 className='titleproduct'>
                                              {cartItem.product.title}
                                            </H3>
                                            <span className='mb-1'>
                                              Available Stocks :{' '}
                                              {cartItem.product.stocks_per_kg}{' '}
                                              kg
                                            </span>
                                          </div>
                                          <div className='quantitybuttoncontainer'>
                                            <InputGroup className='quantitybutton'>
                                              <InputGroup.Button
                                                onClick={() =>
                                                  decrement(cartItem.id)
                                                }
                                                disabled={cartItem.weight == 1}
                                                className='bg-primary text-white textbtnquantity '
                                              >
                                                -
                                              </InputGroup.Button>
                                              <Input
                                                className={
                                                  'custom-input-number text-center textbtnquantity'
                                                }
                                                value={cartItem.weight}
                                                onChange={setValue}
                                              />
                                              <InputGroup.Button
                                                onClick={() =>
                                                  increment(cartItem.id)
                                                }
                                                disabled={
                                                  cartItem.product
                                                    .stocks_per_kg <=
                                                  cartItem.weight
                                                }
                                                className='bg-primary text-white textbtnquantity'
                                              >
                                                +
                                              </InputGroup.Button>
                                            </InputGroup>
                                          </div>
                                        </div>
                                        <div className='d-flex flex-xs-column align-self-end justify-content-end'>
                                          <div
                                            style={{
                                              top: '0',
                                              position: 'absolute',
                                            }}
                                          >
                                            <CloseIcon
                                              className='fs-4 mt-2 fw-bold '
                                              onClick={() =>
                                                removeFromCart(cartItem.id)
                                              }
                                            />
                                          </div>

                                          <span
                                            style={{
                                              position: 'absolute',
                                              bottom: '0',
                                            }}
                                            className='m-3 textbtnquantity'
                                          >
                                            <img
                                              src='/images/seashell.png'
                                              height={20}
                                              width={20}
                                              className='mx-1'
                                              alt=''
                                            />{' '}
                                            {cartItem.product.price_per_kg}
                                          </span>
                                          {/* <Button
                                              className='btn btn-danger rounded mt-2'
                                              onClick={() =>
                                                removeFromCart(cartItem.id)
                                              }
                                            >
                                              Remove
                                            </Button> */}
                                        </div>
                                      </div>
                                    </Card>
                                  </>
                                ))}
                              </>
                            );
                          }
                        )
                      ) : (
                        <div className='text-center d-flex justify-content-center align-items-center h-50'>
                          No items found
                        </div>
                      )}
                      {/* {data && data.length > 0
                        ? data.map((item) =>
                            item ? (
                              
                            ) : (
                              ''
                            )
                          )
                        } */}
                    </div>
                    {Object.values(cartHistoryBySellerId).length > 0 && (
                      <div className='mt-2 w-100'>
                        <Card className='my-5 p-3 border border-1 border-dark-subtle'>
                          <Form
                            className=' mt-2 p-2 px-3'
                            onSubmit={(e) => {
                              e.preventDefault();
                              setLoading(true);
                              setStep1(cartHistoryBySellerId);
                              setGrandTotal(
                                calculateGrandTotalPrice(cartHistoryBySellerId)
                              );
                              setTimeout(() => {
                                setLoading(false);
                                navigate('../shipping');
                              }, 1500);
                            }}
                          >
                            <h3 className='mb-0 fw-bolder'>Summary Details</h3>
                            <hr />
                            {Object.values(cartHistoryBySellerId).map(
                              (item, index) => (
                                <p key={index} className='p-2'>
                                  <strong>{item.length}</strong> item
                                  {item.length > 1 ? "'s" : ''} on Seller{' '}
                                  <strong>
                                    {item.length > 1
                                      ? item[index]
                                        ? item[index].product.user.user_details
                                            .first_name +
                                          ' ' +
                                          (item[index].product.user.user_details
                                            .middle_name
                                            ? item[index].product.user
                                                .user_details.middle_name[0] +
                                              '. '
                                            : '') +
                                          item[index].product.user.user_details
                                            .last_name
                                        : ''
                                      : item[0].product.user.user_details
                                          .first_name +
                                        ' ' +
                                        (item[0].product.user.user_details
                                          .middle_name
                                          ? item[0].product.user.user_details
                                              .middle_name[0] + '. '
                                          : '') +
                                        (item[0].product.user.user_details
                                          .last_name
                                          ? item[0].product.user.user_details
                                              .last_name
                                          : '')}
                                  </strong>{' '}
                                  <br />
                                  <span className='fw-semibold'>
                                    {' '}
                                    Sub Total:
                                  </span>{' '}
                                  {calculateSubTotalPrice(item)}
                                </p>
                              )
                            )}
                            <hr />
                            <p className='fs-4 fw-bold mt-2 d-flex align-items-center'>
                              {' '}
                              Grand Total:{' '}
                              <img
                                src='/images/seashell.png'
                                height={25}
                                width={25}
                                className='mx-1'
                                alt=''
                              />{' '}
                              {calculateGrandTotalPrice(cartHistoryBySellerId)}
                            </p>
                            <div className='d-flex'>
                              <OverlayTrigger
                                overlay={
                                  calculateGrandTotalPrice(
                                    cartHistoryBySellerId
                                  ) > Number(user.wallet.shell_coin_amount) ? (
                                    <Tooltip id='tooltip-disabled'>
                                      Insufficient Coin Amount. Please recharge
                                    </Tooltip>
                                  ) : (
                                    <></>
                                  )
                                }
                              >
                                <span className='d-flex flex-grow-1'>
                                  <Button
                                    variant='warning'
                                    className='text-light rounded flex-grow-1 '
                                    type='submit'
                                    disabled={
                                      calculateGrandTotalPrice(
                                        cartHistoryBySellerId
                                      ) > Number(user.wallet.shell_coin_amount)
                                    }
                                    style={{
                                      pointerEvents:
                                        calculateGrandTotalPrice(
                                          cartHistoryBySellerId
                                        ) >
                                        Number(user.wallet.shell_coin_amount)
                                          ? 'none'
                                          : 'auto',
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faCartPlus} /> &nbsp;
                                    Place Order
                                  </Button>
                                </span>
                              </OverlayTrigger>
                            </div>
                          </Form>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </main>
      </div>
    </>
  );
}
