import { useEffect, useState } from 'react';
import { FormCreate } from '../../Components/Form/Form';
import useAuthContext from '../../Hooks/Context/AuthContext';
import axiosClient from '../../api/axios';
import { TableComponent } from '../../Components/Table/Table';

// Create table headers consisting of 4 columns.
const header = [
  { title: 'Id', prop: 'id' },
  { title: 'Full Name', prop: 'fullname' },
  { title: 'Action', prop: 'action' },
];

export function Dashboard() {
  const foundUserById = [];
  const [body, setBody] = useState([]);
  const [listOfUsersLongDetails, setlistOfUsersLongDetails] = useState([]);

  const [user, setUser] = useState({
    first_name: null,
    middle_name: null,
    last_name: null,
    ext_name: null,
    birth_date: null,
    contact_number: null,
    region: null,
    province: null,
    city: null,
    barangay: null,
    street: null,
    email: null,
    password: null,
    password_confirmation: null,
    user_type: null,
  });

  const [updateUserDetails, setUpdateUserDetails] = useState({
    user_id: null,
    first_name: null,
    middle_name: null,
    last_name: null,
    ext_name: null,
    email: null,
    user_type: null,
    birth_date: null,
    contact_number: null,
    region: null,
    province: null,
    city: null,
    barangay: null,
    street: null,
  });

  const { errors, setErrors } = useAuthContext();

  const createUser = (e) => {
    e.preventDefault();
    axiosClient
      .post('/admin/users', user)
      .then((resp) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(resp);
        setErrors([]);
      })
      .catch((e) => {
        console.log(e.response.data.errors);
        setErrors(e.response.data.errors);
      });
  };

  // Editing User
  const findUser = (user_id) => {
    axiosClient.get('/admin/users/' + user_id).then((resp) => {
      console.log(resp);
      const flattenObject = {
        ...resp.data.foundUserById[0],
        ...resp.data.foundUserById[0].user_details,
      };

      setUpdateUserDetails(flattenObject);
    });
  };

  const editUser = (e) => {
    e.preventDefault();
    console.log(updateUserDetails);
    axiosClient
      .put('/admin/users/' + updateUserDetails.user_id, updateUserDetails)
      .then((resp) => console.log(resp))
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
    console.log(user_id);
  };
  // get user in db
  const setUserDataTable = () => {
    axiosClient.get('/admin/users').then((resp) => {
      setlistOfUsersLongDetails(resp.data.listOfUser);
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
  }, []);

  return (
    <div>
      <div>Dashboard</div>
      <TableComponent header={header} body={body}></TableComponent>
      <br />
      <FormCreate />
      <br />
    </div>
  );
}
