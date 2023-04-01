import useAuthContext from '../../Hooks/Context/AuthContext';

export const ProfileBuyer = () => {
  const { user } = useAuthContext();

  return user ? (
    <div key={user.user_id}>
      <h4> Full Name</h4>
      <p>
        {user ? user.first_name : ''} {user ? user.middle_name : ''}{' '}
        {user ? user.last_name : ''} {user ? user.ext_name : ''}
      </p>
      <h4>User Account Details</h4>
      <p>{user ? user.email : ''}</p>
      <h4>Address</h4>
      <p>
        {user.user_details ? user.user_details.street : ''}
        {user.user_details ? user.user_details.barangay : ''}
        {user.user_details ? user.user_details.city : ''}{' '}
        {user.user_details ? user.user_details.province : ''}
        {user.user_details ? user.user_details.region : ''}
      </p>
      <h4>Contact Number</h4>
      <p>{user.user_details ? user.user_details.contact_number : ''}</p>
      <h4>Birthday</h4>
      <p>{user.user_details ? user.user_details.birth_date : ''}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};
