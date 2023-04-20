import { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';
import { TableComponent } from '../../Components/Table/Table';
import Button from 'react-bootstrap/Button';
import PUBLIC_URL from '../../api/public_url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

const header = [
  //   {
  //     title: 'Id',
  //     prop: 'id',
  //     isSortable: true,
  //   },
  {
    title: 'Product Name',
    prop: 'title',
  },
  {
    title: 'Description',
    prop: 'description',
  },
  {
    title: 'Stocks',
    prop: 'stocks_per_kg',
    isFilterable: true,
    isSortable: true,
  },
  {
    title: 'Price',
    prop: 'price_per_kg',
    isFilterable: true,
    isSortable: true,
  },
  {
    title: 'Product Status',
    prop: 'product_status',
    isFilterable: true,
    isSortable: true,
  },
  //   {
  //     title: 'Date Joined',
  //     prop: 'date_joined',
  //     isSortable: true,
  //   },
  { title: 'Action', prop: 'action' },
];

export function ShopSeller() {
  const [body, setBody] = useState([]);

  // display user details in table
  function ProductDataTable() {
    axiosClient.get('/admin/users').then((resp) => {
      const user = resp.data.listOfUser.map((user, i) => {
        return {
          id: i + 1,
          fullname: (
            <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
              <img
                src={PUBLIC_URL + 'images/' + user.prof_img}
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {user.first_name +
                    ' ' +
                    user.middle_name[0] +
                    '.' +
                    ' ' +
                    user.last_name +
                    ' ' +
                    user.ext_name}
                </p>
                <span className='badge rounded-pill text-bg-primary'>
                  {switchUserType(user)}
                </span>
              </div>
            </div>
          ),
          email: user.email,
          date_joined: dateFormat(user.created_at),
          action: (
            <div key={i} className='button-actions'>
              <span
                onClick={() => viewCompleteDetails(user.user_id)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faEye} className='mx-2' />
              </span>
              <span
                onClick={() => findUser(user.user_id)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faEdit} className='mx-2' />
              </span>
              <span
                onClick={() => deleteUser(user.user_id)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faTrash} className='mx-2' />
              </span>
            </div>
          ),
        };
      });

      setBody(user);
    });
  }

  useEffect(() => {
    ProductDataTable();
  }, [body.id]);

  return (
    <Container>
      <TableComponent
        header={header}
        body={body}
        button={<Button variant='primary'>Add Product</Button>}
      />
    </Container>
  );
}
