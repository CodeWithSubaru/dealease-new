
export const ListUser = ({data}) => {
  return (
      {data.map((user) => {
        return user ? (
          <div key={user.user_id}>
            <h4> Full Name</h4>
            <p>
              {user.first_name} {user.middle_name} {user.last_name}{' '}
              {user.ext_name}
            </p>
            <h4>User Account Details</h4>
            <p>{user.email}</p>
            <h4>Address</h4>
            <p>
              {user.user_details.street} {user.user_details.barangay}
              {user.user_details.city} {user.user_details.province}
              {user.user_details.region}
            </p>
            <h4>Contact Number</h4>
            <p>{user.user_details.contact_number}</p>

            <h4>Birthday</h4>
            <p>{user.user_details.birth_date}</p>
          </div>
        ) : (
          ''
        );
      })}
  )
}
