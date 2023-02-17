import useAuthContext from '../../Hooks/Context/AuthContext';

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Home</h1>
      <p>
        {console.log(user)}
        <div>
          Name: {user.first_name} {user.middle_name} {user.last_name}{' '}
          {user.ext_name}
        </div>
        {user.email}
        <div>Address:</div>
        {user.user_details.birthdate}
        {user.user_details.contact_number}
        <div>Type: {user.user_type}</div>
      </p>
    </div>
  );
};
