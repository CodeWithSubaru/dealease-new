import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axiosClient from '../../api/axios';
import { TableComponent } from '../../Components/Table/Table';
import { H1 } from '../../Components/Helpers/index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-bootstrap';
import {
  faEye,
  faEnvelope,
  faUser,
  faUserLargeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { ViewSingleUser } from './ViewSingleUser';
import PUBLIC_URL from '../../api/public_url';

export function Dashboard() {
  const [singleUser, setSingleUser] = useState(null);
  const [countOfUsers, setCountOfUsers] = useState([]);
  const [countOfMessages, setCountOfMessages] = useState([]);
  const [body, setBody] = useState([]);

  const header = [
    {
      title: 'Id',
      prop: 'id',
      isFilterable: true,
      isSortable: true,
    },
    {
      title: 'Full Name',
      prop: 'fullname',
      isFilterable: true,
      isSortable: true,
    },
    {
      title: 'Email Address',
      prop: 'email',
    },
    {
      title: 'Date Joined',
      prop: 'date_joined',
      isFilterable: true,
      isSortable: true,
    },
    { title: 'Action', prop: 'action', isFilterable: true },
  ];

  function dateFormat(date) {
    let yourDate = new Date(date);
    yourDate = yourDate.toUTCString();
    return yourDate.split(' ').slice(1, 4).join(' ');
  }

  function switchUserType(user) {
    if (user.role_type === 'Admin') {
      return user.role_type;
    }

    if (user.is_buyer === 'Buyer') {
      return user.is_buyer;
    }

    if (user.is_seller === 'Seller') {
      return user.is_seller;
    }

    if (
      user.is_buyer === 'Buyer_seller1' ||
      user.is_seller === 'Buyer_seller2'
    ) {
      return 'Buyer + Seller';
    }
  }

  // Display single user details
  const [showSingleUser, setShowSingleUser] = useState(false);

  const showSingleUserModal = () => setShowSingleUser(true);

  const closeSingleUserModal = () => {
    setShowSingleUser(false);
    setSingleUser(null);
  };

  const viewCompleteDetails = (user_id) => {
    showSingleUserModal();
    axiosClient.get('/admin/users/' + user_id).then((res) => {
      setSingleUser(res.data.foundUserById[0]);
    });
  };

  function setUserDataTable() {
    axiosClient.get('/admin/users-by-10').then((resp) => {
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
            </div>
          ),
        };
      });
      setBody(user);
    });
  }

  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Numbers',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function countByCategory(response, label) {
    const countsByMonth = Array.from({ length: label.length }, () => 0);
    if (!(response.length > 0)) {
      return;
    }

    response.map(({ month, count }) => {
      labels.map((label, index) => {
        if (month === index + 1) {
          countsByMonth[index] += count;
        }
      });
    });
    return countsByMonth;
  }

  function calculateTotal(response) {
    let totalNumber = 0;
    Object.values(response).map((item) => {
      totalNumber += Number(item.count);
    });
    return totalNumber;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: countByCategory(countOfUsers, labels),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Messages',
        data: countByCategory(countOfMessages, labels),
        backgroundColor: 'green',
      },
      {
        label: 'Total Reported Users',
        data: [0],
        backgroundColor: 'blue',
      },
    ],
  };

  const dataChart = {
    labels,
    datasets: [
      {
        label: '# of Users',
        data: countOfUsers.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    axiosClient
      .get('/admin/get-number-of-user')
      .then((response) => setCountOfUsers(response.data));

    axiosClient
      .get('/admin/get-number-of-message')
      .then((response) => setCountOfMessages(response.data));
    setUserDataTable();
  }, [countOfUsers.count, countOfMessages.count]);

  return (
    <Card className='dashboard w-75 mx-auto px-4'>
      <H1 className='mt-4'> Dashboard</H1>
      <div className='cards-details-wrapper d-flex justify-content-between'>
        <CardDetails
          title='Users'
          totalNumber={calculateTotal(countOfUsers)}
          icon={faUser}
          style={{ marginLeft: '0' }}
        />
        <CardDetails
          title='Messages'
          totalNumber={calculateTotal(countOfMessages)}
          icon={faEnvelope}
        />

        <CardDetails
          title='Reported Users'
          totalNumber={2}
          icon={faUserLargeSlash}
        />
      </div>

      {/* View Single User */}
      <ViewSingleUser
        data={singleUser}
        showSingleUser={showSingleUser}
        closeSingleUserModal={closeSingleUserModal}
      />

      <div className='graph-container w-100 p-0 m-0'>
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Bar
                  options={options}
                  data={data}
                  className='mb-4 p-5 rounded'
                  style={{ background: 'white' }}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Body>
                <Doughnut
                  data={dataChart}
                  options={{ responsive: true, maintainAspectRatio: true }}
                  className='my-4 p-5 rounded'
                  style={{ background: 'white' }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className='card my-5 p-4 rounded primary-bg border-0'>
        <H1 className='mb-3'>Latest Users</H1>
        <TableComponent header={header} body={body} />
      </div>
    </Card>
  );
}

function CardDetails(props) {
  return (
    <div
      className='card-details rounded p-4 my-4 w-25 primary-bg d-flex justify-content-between'
      style={{ backgroundColor: '#fff' }}
    >
      <div>
        <H1 style={{ fontSize: '50px' }}>{props.totalNumber}</H1>
        <p>{props.title}</p>
      </div>
      <div className='d-flex align-items-center'>
        <FontAwesomeIcon icon={props.icon} className='icon mx-2' />
      </div>
    </div>
  );
}
