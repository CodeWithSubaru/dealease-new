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
} from '../../Components/Notification/Notification';

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

  // delete user
  const deleteUser = (user_id) => {
    Delete().then((resp) => {
      if (resp.isConfirmed) {
        axiosClient
          .delete('/admin/users/' + user_id)
          .catch((e) => console.log(e));
        setUserDataTable();
      }
    });
  };

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
        setErrors([]);
        setUser({
          profile_image: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          ext_name: '',
          birth_date: '',
          contact_number: '',
          region: '',
          province: '',
          city: '',
          barangay: '',
          street: '',
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
          setUserDataTable();
          closeCreateUserModal();
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

  const editUser = (e) => {
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
          setUserDataTable();
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

    if (user.role_type === 'Admin') {
      return user.role_type;
    }
  }

  // display user details in table
  function setUserDataTable() {
    axiosClient.get('/admin/users').then((resp) => {
      const user = resp.data.listOfUser.map((user, i) => {
        return {
          id: i + 1,
          fullname: (
            <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
              <img
                src={PUBLIC_URL + 'images/' + user.prof_img}
                className='rounded-circle pr-5 border border-2 border-info'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {user.first_name +
                    ' ' +
                    user.user_details.middle_name +
                    '.' +
                    ' ' +
                    user.user_details.last_name +
                    ' ' +
                    user.user_details.ext_name}
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

                <FontAwesomeIcon icon={faCheck} className='mx-2' />
              </span>
            </div>
          ),
        };
      });

      setBody(user);
    });
  }

  useEffect(() => {
    setUserDataTable();
  }, [body.id]);

  return (
    <Card className='w-75 mx-auto px-4 h-100'>
      <div className='rounded p-4  my-5 border-0'>
        <Card className='p-5'>
          <div className='d-flex align-items-center mb-3'>
            <H1>Users</H1>
          </div>

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
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <TableComponent
            header={header}
            body={body}
            button={
              <Button
                variant='primary'
                className='rounded'
                onClick={showCreateUserModal}
              >
                New User
              </Button>
            }
          />

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
              <Modal.Title>Update User</Modal.Title>
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
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
    </Card>
  );
}
