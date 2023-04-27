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
  const { collapseSidebar } = useProSidebar();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const { fetchCountInItemsCart } = useAddToCartContext();

  function decrement() {
    return count <= 0 ? 0 : setCount(count - 1);
  }

  function increment() {
    setCount(count + 1);
  }

  function fetchOrders() {
    axiosClient
      .get('/orders')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  function removeFromCart(id) {
    axiosClient.delete('/orders/' + id).then((res) => {
      fetchOrders();
      fetchCountInItemsCart();
    });
  }

  useEffect(() => {
    fetchOrders();
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
            <button className='btn btn-dark' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faTable} className='navs-icon' />
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
              <MenuItem> Withdraw </MenuItem>
              <MenuItem> Recharge </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to='/withdraw' />}> Withdraw</MenuItem>
            <MenuItem component={<Link to='/inbox' />}> Inbox</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <div className='mx-auto w-75' style={{ height: '100vh' }}>
            <Card>
              <div className='p-5'>
                <H1>Add to Cart</H1>
                <div className='primary-bg rounded p-5'>
                  <Link to='/'>Choose another product</Link>
                  <div className='d-flex flex-wrap'>
                    {data && data.length > 0
                      ? data.map((item) =>
                          item ? (
                            <Card
                              className='d-flex flex-row flex-xs-column w-100 p-2 mt-2'
                              key={item.order_number}
                            >
                              <div
                                className='flex-shrink-1'
                                style={{ width: '150px' }}
                              >
                                <img
                                  src={
                                    PUBLIC_URL + 'images/' + item.product.image
                                  }
                                  alt={
                                    item.product.image ? item.product.image : ''
                                  }
                                  className='w-100'
                                  style={{
                                    height: '150px',
                                    objectFit: 'cover',
                                  }}
                                />
                              </div>
                              <div className='flex-grow-1 d-flex justify-content-between ms-3'>
                                <div>
                                  <H3 className='fs-3'>{item.product.title}</H3>
                                  <p>{item.product.description}</p>
                                  <h5>
                                    {' '}
                                    <img
                                      src='/images/seashell.png'
                                      className='me-2 pb-1'
                                      style={{ height: '25px' }}
                                    ></img>
                                    {item.product.price_per_kg}
                                  </h5>
                                  Stocks: {item.product.stocks_per_kg}
                                  <p>Sub Total {item.total_price}</p>
                                </div>
                                <div className='flex-shrink-0 align-self-end'>
                                  <div className='d-flex align-items-end'>
                                    <Button
                                      variant='primary'
                                      className='w-25 py-2 px-0 me-2'
                                      onClick={decrement}
                                    >
                                      -
                                    </Button>
                                    <input
                                      type='text'
                                      className='w-25 py-1 text-center'
                                      min='0'
                                      value={count}
                                      disabled
                                    />
                                    <Button
                                      variant='primary'
                                      className='w-25 py-2 px-0 ms-2 me-3'
                                      onClick={increment}
                                    >
                                      +
                                    </Button>

                                    <Button
                                      variant='danger'
                                      className='me-2'
                                      onClick={() =>
                                        removeFromCart(item.order_number)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ) : (
                            ''
                          )
                        )
                      : 'No data'}
                  </div>
                </div>

                <Footer />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
