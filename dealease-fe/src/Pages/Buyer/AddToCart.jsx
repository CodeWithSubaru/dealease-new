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

export function AddToCart() {
  const [data, setData] = useState([]);
  const [orderHistoryBySellerId, setOrderHistoryBySellerId] = useState([]);
  const [total, setTotal] = useState(0);
  const { fetchCountInItemsCart } = useAddToCartContext();

  function fetchCartHistoryBySellerId() {
    axiosClient
      .get('orders/seller-id')
      .then((res) => {
        setOrderHistoryBySellerId(Object.values(res.data));
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
      })
      .catch((e) => console.log(e));
  }

  function decrement(id) {
    axiosClient
      .get('/orders/decrement/' + id)
      .then((res) => {
        fetchOrders();
      })
      .catch((e) => console.log(e));
  }

  function calculateTotalPrice(price) {
    let totalPrice = 0;
    totalPrice = totalPrice + Number(price);
    return totalPrice;
  }

  useEffect(() => {
    fetchOrders();
    fetchCartHistoryBySellerId();
  }, []);

  return (
    <>
      <div className='mx-auto w-75'>
        <Card>
          <div className='p-5'>
            <H1>Add to Cart</H1>
            <div className=' primary-bg rounded p-5'>
              <Link to='/'>Choose another product</Link>
              <div className='d-flex'>
                <div className='d-flex flex-wrap me-2'>
                  {data && data.length > 0
                    ? data.map((item) =>
                        item ? (
                          <Card
                            className='d-flex flex-row flex-xs-column w-100 p-2 mt-2'
                            key={item.id}
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
                                <H3 className='fs-3 mb-1'>
                                  {item.product.title}
                                </H3>
                                <p>Description: {item.product.description}</p>
                                <div className='d-flex flex-column mt-4 pt-3'>
                                  <span>
                                    Price: Php {item.product.price_per_kg}
                                  </span>
                                  <span>
                                    Available Stocks :{' '}
                                    {item.product.stocks_per_kg} kg
                                  </span>
                                </div>
                              </div>
                              <div className='flex-shrink-0 align-self-end'>
                                <div className='d-flex align-items-end'>
                                  <Button
                                    variant='primary'
                                    className='w-25 py-2 px-0 me-2 rounded'
                                    onClick={() => decrement(item.id)}
                                    disabled={item.quantity == 1}
                                  >
                                    -
                                  </Button>
                                  <input
                                    type='text'
                                    className='w-25 py-1 text-center'
                                    value={item.quantity}
                                    disabled
                                  />
                                  <Button
                                    variant='primary'
                                    className='w-25 py-2 px-0 ms-2 me-3 rounded'
                                    onClick={() => increment(item.id)}
                                    disabled={
                                      item.product.stocks_per_kg <=
                                      item.quantity
                                    }
                                  >
                                    +
                                  </Button>

                                  <Button
                                    variant='danger'
                                    className='me-2 rounded'
                                    onClick={() => removeFromCart(item.id)}
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
                {data.length > 0 && (
                  <Card className='mt-2 w-100 align-self-baseline'>
                    <Form
                      className='mt-2 p-2 px-3'
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <h3>Summary Details</h3>
                      {console.log(orderHistoryBySellerId)}
                      {orderHistoryBySellerId.map((item, index) => (
                        <p key={index}>
                          {console.log(index.length)}
                          {item.length} item{item.length > 1 && "'s"} Sub Total:{' '}
                          {calculateTotalPrice(
                            item[index] ? item[index].total_price : ''
                          )}{' '}
                          {/* {item[index] ? item[index].product.title : ''} */}
                        </p>
                      ))}
                      <div className='text-end'>
                        <Button
                          variant='warning'
                          className='text-light rounded'
                          type='submit'
                        >
                          Place Order
                        </Button>
                      </div>
                    </Form>
                  </Card>
                )}
              </div>
            </div>

            <Footer />
          </div>
        </Card>
      </div>
    </>
  );
}
