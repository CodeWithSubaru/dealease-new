import { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';
import { TableComponent } from '../../Components/Table/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FormUser } from './FormUser/FormUser';
import { ViewSingleUser } from './ViewSingleUser';
import { H1 } from '../../Components/Helpers/index.style';
import PUBLIC_URL from '../../api/public_url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEdit,
  faTrash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import {
  Delete,
  Notification,
  Finalize,
} from '../../Components/Notification/Notification';
import { Load } from '../../Components/Loader/Load';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';

const header = [
  {
    title: 'Id',
    prop: 'id',
    isSortable: true,
  },
  {
    title: 'Full Name',
    prop: 'fullname',
  },
  {
    title: 'Username',
    prop: 'username',
    isFilterable: true,
    isSortable: true,
  },
  {
    title: 'Email Address',
    prop: 'email',
    isFilterable: true,
    isSortable: true,
  },
  {
    title: 'Date Joined',
    prop: 'date_joined',
    isSortable: true,
  },
  { title: 'Action', prop: 'action' },
];

export function Users() {
  const [body, setBody] = useState([]);
  const [user, setUser] = useState({});
  const [singleUser, setSingleUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfUnverifiedUser, setNumberOfUnverifiedUser] = useState(0);

  function fetchNumberOfUsers() {
    axiosClient.get('/admin/users/number-users').then((res) => {
      setNumberOfUsers(res.data);
      console.log(res);
    });
  }

  function fetchNumberOfUnverifiedUsers() {
    axiosClient
      .get('/admin/users/number-unverified-user')
      .then((res) => setNumberOfUnverifiedUser(res.data));
  }

  // delete user
  const deleteUser = (user_id, uri) => {
    Delete().then((resp) => {
      if (resp.isConfirmed) {
        axiosClient
          .delete('/admin/users/' + user_id)
          .catch((e) => console.log(e));
        setUserDataTable(uri);
      }
    });
  };

  // verify user
  function verifyUser(user_id, uri) {
    Finalize({
      text: "You won't be able to revert this!",
      confirmButton: 'Yes, Update User',
      successMsg: 'Data has been updated Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/admin/verify-user/' + user_id)
          .then((res) => console.log(e))
          .catch((e) => console.log(e));
        setUserDataTable(uri);
        fetchNumberOfUsers();
        fetchNumberOfUnverifiedUsers();
      }
    });
  }

  // Show Create User Modal
  const [showCreateUser, setShowCreateUser] = useState(false);
  const showCreateUserModal = () => setShowCreateUser(true);
  const closeCreateUserModal = () => {
    setShowCreateUser(false);
    setErrors([]);
  };

  const createUser = (e) => {
    e.preventDefault();
    axiosClient
      .post('/admin/users', user, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        setUser({
          prof_img: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          ext_name: '',
          birth_date: '',
          contact_number: '',
          barangay: '',
          street: '',
          username: '',
          email: '',
          password: '',
          password_confirmation: '',
          user_type: '',
        });
        Notification({
          title: 'Success',
          message: res.data.message,
          icon: 'success',
        }).then(() => {
          setUserDataTable(url);
          closeCreateUserModal();
          fetchNumberOfUsers();
          fetchNumberOfUnverifiedUsers();
        });
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
    setErrors([]);
  };

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

  // Find and Update user by id
  const [updateUserDetails, setUpdateUserDetails] = useState({});
  const [showEditUser, setShowEditUser] = useState(false);
  const showEditUserModal = () => setShowEditUser(true);

  const closeEditUserModal = () => {
    setShowEditUser(false);
    setErrors({});
    setUpdateUserDetails({});
  };

  const findUser = (user_id) => {
    showEditUserModal();
    axiosClient.get('/admin/users/' + user_id).then((resp) => {
      const flattenObject = {
        ...resp.data.foundUserById[0],
        ...resp.data.foundUserById[0].user_details,
      };
      setUpdateUserDetails(flattenObject);
    });
  };

  const editUser = (e, uri) => {
    e.preventDefault();

    axiosClient
      .post('/admin/users/' + updateUserDetails.user_id, updateUserDetails, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        Notification({
          title: 'Success',
          message: res.data.message,
          icon: 'success',
        }).then(() => {
          closeEditUserModal();
          setUserDataTable(url);
          fetchNumberOfUsers();
          fetchNumberOfUnverifiedUsers();
        });
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  function dateFormat(date) {
    let yourDate = new Date(date);
    yourDate = yourDate.toUTCString();
    return yourDate.split(' ').slice(1, 4).join(' ');
  }

  function switchUserType(user) {
    if (user.role_type === 'User') {
      return user.role_type;
    }

    if (user.role_type === 'Rider') {
      return user.role_type;
    }

    if (user.role_type === 'Admin') {
      return user.role_type;
    }
  }

  // display user details in table
  function setUserDataTable(uri) {
    setLoading(true);
    setUrl(uri);
    axiosClient.get(uri).then((resp) => {
      const user = resp.data.listOfUser.map((user, i) => {
        return {
          id: i + 1,
          fullname: (
            <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
              <img
                src={PUBLIC_URL + 'images/' + user.prof_img}
                className='rounded-circle pr-5 border border-2 border-secondary border-opacity-50'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {user.user_details ? user.user_details.first_name : ' '}{' '}
                  {user.user_details
                    ? user.user_details.middle_name
                      ? user.user_details.middle_name[0] + '. '
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
                <span
                  className={
                    'badge rounded-pill text-bg-' +
                    (switchUserType(user) == 'User' ? 'primary' : 'secondary')
                  }
                >
                  {switchUserType(user)}
                </span>
              </div>
            </div>
          ),
          username: user.username,
          email: user.email,
          date_joined: dateFormat(user.created_at),
          action: (
            <div key={i} className='button-actions w-100 text-nowrap'>
              <span
                onClick={() => viewCompleteDetails(user.user_id)}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-primary px-2 me-2 btn'
              >
                View
              </span>
              {uri == '/admin/users' ? (
                <>
                  {' '}
                  <span
                    onClick={() => findUser(user.user_id, uri)}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded text-bg-success px-2 me-2 btn'
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => deleteUser(user.user_id, uri)}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded text-bg-danger px-2 me-2 btn'
                  >
                    Delete
                  </span>
                </>
              ) : (
                <span
                  onClick={() => verifyUser(user.user_id, uri)}
                  style={{ cursor: 'pointer' }}
                  className='badge rounded text-bg-secondary px-2 me-2 btn'
                >
                  {' '}
                  Accept
                </span>
              )}
            </div>
          ),
        };
      });
      setLoading(false);
      fetchNumberOfUsers();
      fetchNumberOfUnverifiedUsers();
      setBody(user);
    });
  }

  useEffect(() => {
    setUserDataTable('/admin/users');
    fetchNumberOfUsers();
    fetchNumberOfUnverifiedUsers();
  }, [body.id]);

  return (
    <Card className='w-75 mx-auto px-4 h-100'>
      <div className='rounded p-4  my-5 border-0'>
        <Modal
          size='lg'
          show={showCreateUser}
          onHide={closeCreateUserModal}
          centered
          keyboard
          scrollable
          contentClassName={'mt-0'}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Creating User */}
            <FormUser
              submitHook={createUser}
              user={user}
              setUser={setUser}
              errors={errors}
              setErrors={setErrors}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant='secondary'
              className='rounded'
              onClick={closeCreateUserModal}
            >
              Close
            </Button>
            <Button
              variant='primary'
              className='rounded'
              type='submit'
              form='createUserForm'
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Nav justify variant='tabs' defaultActiveKey='/admin/users'>
            <Nav.Item>
              <Nav.Link
                eventKey='first'
                onClick={() => {
                  setUserDataTable('/admin/users');
                }}
                disabled={loading}
              >
                All
                <span
                  className='badge rounded-pill text-bg-primary position-relative'
                  style={{ top: '-8px', left: '0px' }}
                >
                  {numberOfUsers}
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey='second'
                onClick={() => {
                  setUserDataTable('/admin/users/unverified');
                }}
                disabled={loading}
              >
                Unverified Users
                <span
                  className='badge rounded-pill text-bg-primary position-relative'
                  style={{ top: '-8px', left: '0px' }}
                >
                  {numberOfUnverifiedUser}
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <Card className='p-5 pb-1 rounded'>
                <H1 className='text-home mb-4 fw-bold'>All Users</H1>
                {loading ? (
                  <Load />
                ) : (
                  <TableComponent
                    header={header}
                    body={body}
                    button={
                      <Button
                        variant='primary'
                        className='rounded'
                        onClick={showCreateUserModal}
                      >
                        Add New User
                      </Button>
                    }
                  />
                )}
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey='second'>
              <Card className='p-5 pb-1 rounded'>
                <H1 className='text-home mb-4 fw-bold'>Unverified Users</H1>
                {loading ? (
                  <Load />
                ) : (
                  <TableComponent header={header} body={body} />
                )}
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* View Single User */}
        <ViewSingleUser
          data={singleUser}
          showSingleUser={showSingleUser}
          closeSingleUserModal={closeSingleUserModal}
        />

        {/* Edit and Update User */}
        <Modal
          show={showEditUser}
          onHide={closeEditUserModal}
          size='lg'
          centered
          keyboard
          scrollable
          contentClassName={'mt-0'}
        >
          <Modal.Header closeButton>
            <Modal.Title className='fw-bold'>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUser
              submitHook={editUser}
              user={user}
              updateUserDetails={updateUserDetails}
              setUpdateUserDetails={setUpdateUserDetails}
              errors={errors}
              setErrors={setErrors}
              edit
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              className='rounded'
              onClick={closeEditUserModal}
            >
              Close
            </Button>
            <Button
              variant='primary'
              className='rounded'
              type='submit'
              form='createUserForm'
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Card>
  );
}
