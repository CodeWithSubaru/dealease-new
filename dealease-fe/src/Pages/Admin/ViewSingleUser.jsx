import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PUBLIC_URL from '../../api/public_url';

export const ViewSingleUser = (props) => {
  function dateFormat(date) {
    let yourDate = new Date(date);
    yourDate = yourDate.toUTCString();
    return yourDate.split(' ').slice(1, 4).join(' ');
  }

  return (
    <>
      <Modal
        size='lg'
        show={props.showSingleUser}
        onHide={props.closeSingleUserModal}
        centered
        keyboard
        scrollable
        contentClassName={'mt-0'}
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>View User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.data ? (
            <div key={props.data.user_id}>
              <div>
                Submitted Id (Front):{' '}
                <img src={PUBLIC_URL + 'images/' + props.img} alt='' />
              </div>

              <div>
                Submitted Id (Back):{' '}
                <img src={PUBLIC_URL + 'images/' + props.img} alt='' />
              </div>
              <h4> Full Name</h4>
              <p>
                {props.data ? props.data.first_name : ''}{' '}
                {props.data.user_details
                  ? props.data.user_details.middle_name
                    ? props.data.user_details.middle_name[0] + '.'
                    : ''
                  : ''}{' '}
                {props.data.user_details
                  ? props.data.user_details.last_name
                  : ''}{' '}
                {props.data.user_details
                  ? props.data.user_details.ext_name
                    ? props.data.user_details.ext_name
                    : ''
                  : ''}
              </p>
              <h4>User Account Details</h4>
              <p>{props.data ? props.data.email : ''}</p>
              <h4>Address</h4>
              <p>
                {props.data.user_details ? props.data.user_details.street : ''}{' '}
                {props.data.user_details
                  ? props.data.user_details.barangay
                  : ''}{' '}
                {props.data.user_details ? props.data.user_details.city : ''}{' '}
                {props.data.user_details
                  ? props.data.user_details.province
                  : ''}{' '}
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
                {props.data.user_details
                  ? dateFormat(props.data.user_details.birth_date)
                  : ''}
              </p>
            </div>
          ) : (
            'Loading...'
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            className='rounded'
            onClick={props.closeSingleUserModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
