import { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';
import { TableComponent } from '../../Components/Table/Table';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { FormUser } from './FormUser/FormUser';
import { ViewSingleUser } from './ViewSingleUser';

const header = [
  { title: 'Id', prop: 'id' },
  { title: 'Full Name', prop: 'fullname' },
  { title: 'Action', prop: 'action' },
];

export function Users() {
  const [body, setBody] = useState([]);
  const [user, setUser] = useState({});
  const [updateUserDetails, setUpdateUserDetails] = useState({});
  const [singleUser, setSingleUser] = useState(null);
  const [fetchAllUser, setFetchAllUser] = useState([]);

  const { errors, setErrors } = useAuthContext();

  const createUser = (e) => {
    e.preventDefault();
    axiosClient
      .post('/admin/users', user)
      .then((resp) => {
        setErrors([]);
        setUser({
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
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
      });
  };

  // Editing User
  const findUser = (user_id) => {
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
      .put('/admin/users/' + updateUserDetails.user_id, updateUserDetails)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => console.log(e));
  };

  // delete user
  const deleteUser = (user_id) => {
    console.log(user_id);
    axiosClient
      .delete('/admin/users/' + user_id)
      .then((resp) => {
        console.log(resp);
        setUser({ ...user });
      })
      .catch((e) => console.log(e));
  };
  const viewCompleteDetails = (user_id) => {
    setSingleUser(fetchAllUser[user_id - 1]);
  };

  // get user in db
  const setUserDataTable = () => {
    axiosClient.get('/admin/users').then((resp) => {
      setFetchAllUser(resp.data.listOfUser);
      const user = resp.data.listOfUser.map((user) => {
        return {
          id: user.user_id,
          fullname:
            user.first_name +
            ' ' +
            user.middle_name +
            ' ' +
            user.last_name +
            ' ' +
            user.ext_name,
          action: (
            <div>
              <button onClick={() => viewCompleteDetails(user.user_id)}>
                View
              </button>
              <button onClick={() => findUser(user.user_id)}>Edit</button>
              <button onClick={() => deleteUser(user.user_id)}>Delete</button>
            </div>
          ),
        };
      });

      setBody(user);
    });
  };

  useEffect(() => {
    setErrors([]);
    setUserDataTable();
  }, [user]);

  return (
    <div>
      <div>Dashboard</div>
      <TableComponent header={header} body={body}></TableComponent>
      <br />
      {/* Get Single User */}
      <ViewSingleUser data={singleUser} />
      {/* Create New User */}
      <FormUser
        submitHook={createUser}
        user={user}
        setUser={setUser}
        errors={errors}
        setErrors={setErrors}
      />
      {/* Update User */}
      <FormUser
        submitHook={editUser}
        user={user}
        updateUserDetails={updateUserDetails}
        setUpdateUserDetails={setUpdateUserDetails}
        errors={errors}
        setErrors={setErrors}
        edit
      />
      <br />
    </div>
  );
}
