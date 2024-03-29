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
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-bootstrap';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBurger,
  faHamburger,
  faHouse,
  faDashboard,
  faSliders,
  faTable,
  faToggleOn,
  faInbox,
  faEye,
  faEnvelope,
  faHandshake,
  faUser,
  faUserLargeSlash,
  faHourglass1,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ViewSingleUser } from './ViewSingleUser';
import PUBLIC_URL from '../../api/public_url';
import { Footer } from '../../Components/Footer/Footer';
export function Dashboard() {
  const [singleUser, setSingleUser] = useState(null);
  const [countOfUsers, setCountOfUsers] = useState([]);
  const [countOfMessages, setCountOfMessages] = useState([]);
  const [body, setBody] = useState([]);
  const { collapseSidebar } = useProSidebar();
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
                {user.first_name + ' '}
                  {user.user_details
                    ? user.user_details.middle_name
                      ? user.user_details.middle_name + '. '
                      : ' '
                    : ''}
                  {user.user_details
                    ? user.user_details.last_name
                      ? user.user_details.last_name
                      : ' '
                    : ' '}{' '}
                  {user.user_details
                    ? user.user_details.ext_name
                      ? user.user_details.ext_name
                      : ' '
                    : ' '}
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
        label: 'Pending Transactions',
        data: countByCategory(countOfMessages, labels),
        backgroundColor: 'green',
      },
      {
        label: 'Total Transactions',
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
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          width='190px'
          collapsedWidth='65px'
          transitionDuration='500'
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#1f98f4',
              position: 'fixed',
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
            <button className='btn' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/admin/dashboard' />}
            >
              <FontAwesomeIcon icon={faDashboard} className='navs-icon' />
              Dashboard
            </MenuItem>
            <SubMenu label='Transactions'>
              {/* <FontAwesomeIcon icon={faInbox} className="navs-icon" /> */}
              <MenuItem component={<Link to='/seller/withdraw' />}>
                Withdraw
              </MenuItem>
              {/* <MenuItem component={<Link to="/recharge" />}>Recharge</MenuItem> */}
            </SubMenu>
            <MenuItem
              className='text-black'
              component={<Link to='/seller/inbox' />}
            >
              <FontAwesomeIcon icon={faInbox} className='navs-icon' />
              Inbox
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100' style={{ minHeight: '815px' }}>
          <Card className='dashboard w-75 mx-auto px-4'>
            <H1 className='mt-4'>Dashboard</H1>
            <div className='cards-details-wrapper d-flex justify-content-between'>
              <CardDetails
                title='Users'
                totalNumber={calculateTotal(countOfUsers)}
                icon={faUser}
                style={{ marginLeft: '0' }}
                color='bg-primary'
              />
              <CardDetails
                title='Pending Transactions'
                totalNumber={calculateTotal(countOfMessages)}
                icon={faHourglass1}
                color='bg-success'
              />

              <CardDetails
                title='Total Transactions'
                totalNumber={2}
                icon={faUserLargeSlash}
                color='bg-secondary'
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
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                        }}
                        className='my-4 p-5 rounded'
                        style={{ background: 'white' }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            <div className='card my-5 p-4 rounded border-0'>
              <H1 className='mb-3'>Latest Users</H1>
              <TableComponent header={header} body={body} />
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
}

function CardDetails(props) {
  return (
    <Card
      className='card-details rounded p-4 my-4 d-flex justify-content-between'
      style={{ backgroundColor: '#fff', width: '32%' }}
    >
      <div className='d-flex justify-content-between'>
        <div className='d-flex mb-5'>
          <FontAwesomeIcon
            icon={props.icon}
            className={'mx-2 rounded-circle text-white p-3 ' + props.color}
            style={{ width: '45px', height: '45px' }}
          />
        </div>
        <div className='d-flex flex-column align-items-end'>
          <p className='text-nowrap'>{props.title}</p>
          <H1 style={{ fontSize: '50px' }}>{props.totalNumber}</H1>
        </div>
      </div>
    </Card>
  );
}
