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

export function AddToCart() {
  const [cartHistoryBySellerId, setCartHistoryBySellerId] = useState([]);
  const { fetchCountInItemsCart } = useAddToCartContext();
  const navigate = useNavigate();

  function fetchCartHistoryBySellerId() {
    axiosClient
      .get('orders/seller-id')
      .then((res) => {
        setCartHistoryBySellerId(res.data);
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

    return Number(totalPrice).toLocaleString('en-US');
  }

  useEffect(() => {
    fetchCartHistoryBySellerId();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          width='190px'
          collapsedWidth='65px'
          transitionDuration='500'
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#19a9d0',
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? '#f5d9ff' : '#white',
                    backgroundColor: active ? '#eecef9' : undefined,
                  };
              },
            }}
          >
            <button className='btn ' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              {/* <FontAwesomeIcon icon={faHouse} className='navs-icon' />  */}
              Home
            </MenuItem>
            <SubMenu label='Transactions'>
              <MenuItem component={<Link to='/withdraw' />}>
                {' '}
                Withdraw{' '}
              </MenuItem>
              <MenuItem component={<Link to='/recharge' />}>
                {' '}
                Recharge{' '}
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <div className='mx-auto w-75 d-flex' style={{ height: '100vh' }}>
            <Card className='flex-grow-1'>
              <div className='p-5 h-100'>
                <H1 className='mb-4'>Add to Cart</H1>
                <div className=' rounded p-5 pt-0 h-100'>
                  <Link className='btn btn-primary rounded' to='/'>
                    <FontAwesomeIcon icon={faPlus} /> Add More
                  </Link>
                  <div className='d-flex h-100'>
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
                                        ? item[index].product.user.first_name +
                                          ' ' +
                                          item[index].product.user.user_details
                                            .middle_name[0] +
                                          '.' +
                                          ' ' +
                                          item[index].product.user.user_details
                                            .last_name
                                        : ''
                                      : item[0].product.user.first_name +
                                        ' ' +
                                        item[0].product.user.user_details
                                          .middle_name[0] +
                                        '.' +
                                        ' ' +
                                        item[0].product.user.user_details
                                          .last_name}
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
                        <Card className='mt-5 p-3 align-self-baseline flex-shrink-0'>
                          <Form
                            className=' mt-2 p-2 px-3'
                            onSubmit={(e) => {
                              e.preventDefault();
                              Finalize({
                                confirmButton: 'Yes, Place my order',
                                text: "You won't be able to revert this!",
                                successMsg: 'Your Order Placed Successfully.',
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  axiosClient
                                    .post('/orders/place-order', {
                                      cartHistoryBySellerId,
                                    })
                                    .then((res) => console.log(res))
                                    .catch((e) => console.log(e));
                                  fetchCountInItemsCart();
                                  fetchCartHistoryBySellerId();
                                  navigate('/orders');
                                }
                              });
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
                                        ? item[index].product.user.first_name
                                        : ''
                                      : item[0].product.user.first_name}
                                  </strong>{' '}
                                  <br />
                                  Sub Total: {calculateSubTotalPrice(item)}
                                </p>
                              )
                            )}
                            <hr />
                            <p className='fs-4 fw-bold mt-2'>
                              {' '}
                              Grand Total:{' '}
                              {calculateGrandTotalPrice(cartHistoryBySellerId)}
                            </p>
                            <div className='d-flex text-end'>
                              <Button
                                variant='warning'
                                className='text-light rounded flex-grow-1 '
                                type='submit'
                              >
                                <FontAwesomeIcon icon={faCartPlus} /> &nbsp;
                                Place Order
                              </Button>
                            </div>
                          </Form>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
