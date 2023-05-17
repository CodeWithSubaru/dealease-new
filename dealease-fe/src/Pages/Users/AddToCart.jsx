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
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
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

export function AddToCart() {
  const [cartHistoryBySellerId, setCartHistoryBySellerId] = useState([]);
  const { fetchCountInItemsCart } = useAddToCartContext();
  const { setStep1, setGrandTotal } = useOrderContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

        <main className='w-100' style={{ height: '85vh' }}>
          <div className='mx-auto w-75 d-flex h-100'>
            <Card className='flex-grow-1'>
              {loading ? (
                <Load />
              ) : (
                <div className='p-5 h-100'>
                  <H1 className='mb-4'>Add to Cart</H1>
                  <Link className='btn btn-primary rounded float-end' to='/'>
                    <FontAwesomeIcon icon={faPlus} /> Add More
                  </Link>
                  <div
                    className=' rounded p-5 pt-0'
                    style={{ height: '70vh', overflowY: 'auto' }}
                  >
                    <div className='d-flex h-100'>
                      <div className='flex-grow-1 me-2 h-75'>
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
                                          ? item[index].product.user.first_name
                                          : ''
                                        : item[0].product.user.first_name}{' '}
                                      {item.length > 1
                                        ? item[index].product.user.user_details
                                            .middle_name
                                          ? item[index].product.user
                                              .user_details.middle_name[0] +
                                            '. '
                                          : ''
                                        : item[0].product.user.user_details
                                            .middle_name
                                        ? item[0].product.user.user_details
                                            .middle_name[0] + '. '
                                        : ''}{' '}
                                      {item.length > 1
                                        ? item[index].product.user.user_details
                                            .last_name
                                          ? item[index].product.user
                                              .user_details.last_name
                                          : ''
                                        : item[0].product.user.user_details
                                            .last_name}{' '}
                                      {item.length > 1
                                        ? item[index].product.user.user_details
                                            .ext_name
                                          ? item[index].product.user
                                              .user_details.ext_name
                                          : ''
                                        : item[0].product.user.user_details
                                            .ext_name}
                                    </span>
                                  </p>
                                  {item.map((cartItem, index) => (
                                    <>
                                      <Card
                                        className='d-flex flex-row flex-xs-column w-100 p-2 mb-3 mt-2 border border-1 border-dark-subtle'
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
                                            <H3 className='fs-3'>
                                              {cartItem.product.title}
                                            </H3>
                                            <div className='d-flex flex-column'>
                                              <span>
                                                Price: Php{' '}
                                                {cartItem.product.price_per_kg}
                                              </span>
                                              <span>
                                                Available Stocks :{' '}
                                                {cartItem.product.stocks_per_kg}{' '}
                                                kg
                                              </span>
                                            </div>
                                          </div>
                                          <div className='flex-shrink-0 align-self-end justify-content-end'>
                                            <div className='d-flex align-items-end justify-content-end'>
                                              <Button
                                                variant='primary'
                                                className='w-25 py-2 px-0 me-2 rounded'
                                                onClick={() =>
                                                  decrement(cartItem.id)
                                                }
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
                                                onClick={() =>
                                                  increment(cartItem.id)
                                                }
                                                disabled={
                                                  cartItem.product
                                                    .stocks_per_kg <=
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
                        <div className='mt-2 d-flex'>
                          <Card className='mt-5 p-3 align-self-baseline flex-shrink-0 border border-1 border-dark-subtle'>
                            <Form
                              className=' mt-2 p-2 px-3'
                              onSubmit={(e) => {
                                e.preventDefault();
                                setLoading(true);
                                setStep1(cartHistoryBySellerId);
                                setGrandTotal(
                                  calculateGrandTotalPrice(
                                    cartHistoryBySellerId
                                  )
                                );
                                setTimeout(() => {
                                  setLoading(false);
                                  navigate('../shipping');
                                }, 1500);
                              }}
                            >
                              <h3 className='mb-0 fw-bolder'>
                                Summary Details
                              </h3>
                              <hr />
                              {Object.values(cartHistoryBySellerId).map(
                                (item, index) => (
                                  <p key={index} className='p-2'>
                                    <strong>{item.length}</strong> item
                                    {item.length > 1 ? "'s" : ''} on Seller{' '}
                                    <strong>
                                      {item.length > 1
                                        ? item[index]
                                          ? item[index].product.user
                                              .first_name +
                                            ' ' +
                                            (item[index].product.user
                                              .user_details.middle_name
                                              ? item[index].product.user
                                                  .user_details.middle_name[0] +
                                                '. '
                                              : '') +
                                            item[index].product.user
                                              .user_details.last_name
                                          : ''
                                        : item[0].product.user.first_name +
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
                                {calculateGrandTotalPrice(
                                  cartHistoryBySellerId
                                )}
                              </p>
                              <div className='d-flex'>
                                <OverlayTrigger
                                  overlay={
                                    calculateGrandTotalPrice(
                                      cartHistoryBySellerId
                                    ) >
                                    Number(user.wallet.shell_coin_amount) ? (
                                      <Tooltip id='tooltip-disabled'>
                                        Insufficient Coin Amount. Please
                                        recharge
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
                                        ) >
                                        Number(user.wallet.shell_coin_amount)
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
                                      <FontAwesomeIcon icon={faCartPlus} />{' '}
                                      &nbsp; Place Order
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
          </div>
        </main>
      </div>
    </>
  );
}
