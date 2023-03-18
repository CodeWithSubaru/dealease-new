export const ViewSingleUser = (props) => {
  return (
    <>
      {props.data ? (
        <div key={props.data.user_id}>
          <h4> Full Name</h4>
          <p>
            {props.data ? props.data.first_name : ''}{' '}
            {props.data ? props.data.middle_name : ''}{' '}
            {props.data ? props.data.last_name : ''}{' '}
            {props.data ? props.data.ext_name : ''}
          </p>
          <h4>User Account Details</h4>
          <p>{props.data ? props.data.email : ''}</p>
          <h4>Address</h4>
          <p>
            {props.data.user_details ? props.data.user_details.street : ''}
            {props.data.user_details ? props.data.user_details.barangay : ''}
            {props.data.user_details ? props.data.user_details.city : ''}{' '}
            {props.data.user_details ? props.data.user_details.province : ''}
            {props.data.user_details ? props.data.user_details.region : ''}
          </p>
          <h4>Contact Number</h4>
          <p>
            {props.data.user_details
              ? props.data.user_details.contact_number
              : ''}
          </p>

          <h4>Birthday</h4>
          <p>
            {props.data.user_details ? props.data.user_details.birth_date : ''}
          </p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
