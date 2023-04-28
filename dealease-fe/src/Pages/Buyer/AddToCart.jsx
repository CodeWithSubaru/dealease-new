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
import {
  faEye,
  faEdit,
  faTrash,
  faFishFins,
  faSheqel,
  faTable,
  faBars,
  faClose,
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

export function AddToCart() {
  const [data, setData] = useState([]);
  const [cartHistoryBySellerId, setCartHistoryBySellerId] = useState([]);
  const [total, setTotal] = useState(0);
  const { fetchCountInItemsCart } = useAddToCartContext();

  function fetchCartHistoryBySellerId() {
    axiosClient
      .get('orders/seller-id')
      .then((res) => {
        setCartHistoryBySellerId(Object.values(res.data));
      })
      .catch((e) => console.log(e));
  }

  function fetchOrders() {
    axiosClient
      .get('/orders')
      .then((res) => {
        const userIds = [];
        Object.values(res.data).map(({ product }) =>
          userIds.push(product.user.user_id)
        );

        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  function removeFromCart(id) {
    axiosClient.delete('/orders/' + id).then((res) => {
      fetchOrders();
      fetchCountInItemsCart();
      fetchCartHistoryBySellerId();
    });
  }

  function increment(id) {
    axiosClient
      .get('/orders/increment/' + id)
      .then((res) => {
        fetchOrders();
        fetchCartHistoryBySellerId();
      })
      .catch((e) => console.log(e));
  }

  function decrement(id) {
    axiosClient
      .get('/orders/decrement/' + id)
      .then((res) => {
        fetchOrders();
        fetchCartHistoryBySellerId();
      })
      .catch((e) => console.log(e));
  }

  function calculateTotalPrice(price) {
    // const subTotal = orders.reduce((accumulator, currentValue) => {
    //   return accumulator + parseFloat(currentValue.total_price);
    // }, 0);
    // return subTotal;
  }

  useEffect(() => {
    fetchOrders();
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
            <MenuItem component={<Link to='/inbox' />}> Inbox</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <div className='mx-auto w-75' style={{ height: '100vh' }}>
            <Card>
              <div className='p-5'>
                <H1>Add to Cart</H1>
                <div className='primary-bg rounded p-5'>
                  <Link className='btn btn-primary rounded' to='/'>
                    Add More
                  </Link>
                  <div className='d-flex'>
                    <div className='d-flex flex-wrap me-2'>
                      {cartHistoryBySellerId.length > 0 ? (
                        cartHistoryBySellerId.map((item, index) => {
                          return (
                            <>
                              <p className='mb-0 mt-4'>
                                Seller{' '}
                                <span className='badge rounded-pill text-bg-primary'>
                                  {item.length > 1
                                    ? item[index]
                                      ? item[index].product.user.first_name
                                      : ''
                                    : item[0].product.user.first_name}
                                </span>
                              </p>
                              {item.map((cartItem) => (
                                <>
                                  <Card
                                    className='d-flex flex-row flex-xs-column w-100 p-2 mb-2 mt-2'
                                    key={cartItem.id}
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
                                            {cartItem.product.stocks_per_kg} kg
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
                                            className='w-25 py-2 px-0 ms-2 rounded'
                                            onClick={() =>
                                              increment(cartItem.id)
                                            }
                                            disabled={
                                              cartItem.product.stocks_per_kg <=
                                              cartItem.weight
                                            }
                                          >
                                            +
                                          </Button>

                                          <span
                                            className='btn btn-danger rounded-circle d-flex justify-content-center align-items-center p-1 position-absolute'
                                            style={{
                                              width: '25px',
                                              height: '25px',
                                              top: '-12px',
                                              right: '-8px',
                                            }}
                                            onClick={() =>
                                              removeFromCart(cartItem.id)
                                            }
                                          >
                                            <FontAwesomeIcon
                                              icon={faClose}
                                              className='text-center'
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </>
                              ))}
                            </>
                          );
                        })
                      ) : (
                        <div className='text-center'>No Data</div>
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
                    {data.length > 0 && (
                      <div className='mt-2 w-75'>
                        <Card className='mt-5 align-self-baseline '>
                          <Form
                            className=' mt-2 p-2 px-3'
                            onSubmit={(e) => {
                              e.preventDefault();
                              axiosClient
                                .post('/orders/', { orderNumber })
                                .then((res) => console.log(res))
                                .catch((e) => console.log(e));
                            }}
                          >
                            <h3 className='mb-0 fw-bolder'>Summary Details</h3>
                            <hr />
                            {cartHistoryBySellerId.map((item, index) => (
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
                                Sub Total:{' '}
                                {item.map((cartItem) => cartItem.total_price)},
                              </p>
                            ))}
                            <hr />
                            <p className='fs-4 fw-bold text-end'>
                              {' '}
                              Grand Total: 0
                            </p>
                            <div className='d-flex text-end'>
                              <Button
                                variant='warning'
                                className='text-light rounded flex-grow-1 '
                                type='submit'
                              >
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
