import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PUBLIC_URL from '../../api/public_url';
import { useState } from 'react';

export const ViewSingleUser = (props) => {
  const [imageModal, setimageModal] = useState(false);
  const [imageToPreview, setImageToPreview] = useState(1);

  function dateFormat(date) {
    let yourDate = new Date(date);
    yourDate = yourDate.toUTCString();
    return yourDate.split(' ').slice(1, 4).join(' ');
  }

  function previewImage(setOfImage) {
    setimageModal(true);
    setImageToPreview(setOfImage);
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
              {console.log(props.data)}
              {props.data.avr_id ? (
                <>
                  <div>
                    <span className='d-block'> 1st Submitted Id :</span>{' '}
                    <img
                      src={PUBLIC_URL + 'images/' + props.data.avr.valid_id_1}
                      alt=''
                      className='rounded'
                      onClick={() => {
                        previewImage(1);
                      }}
                    />
                  </div>
                  <div>
                    <span className='d-block'>2nd Submitted Id : </span>{' '}
                    <img
                      src={PUBLIC_URL + 'images/' + props.data.avr.valid_id_2}
                      alt=''
                      onClick={() => {
                        previewImage(2);
                      }}
                    />
                  </div>
                </>
              ) : (
                ''
              )}
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

      <Modal
        size='md'
        show={imageModal}
        onHide={() => setimageModal(false)}
        centered
        keyboard
        scrollable
        contentClassName={'mt-0'}
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>
            {imageToPreview === 1 ? '1st' : '2nd'} User's Valid ID
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.data ? (
            <div key={props.data.user_id}>
              <>
                {imageToPreview === 1 ? (
                  <div>
                    <img
                      src={PUBLIC_URL + 'images/' + props.data.avr.valid_id_1}
                      alt=''
                      className='rounded w-100 px-5'
                      onClick={() => {
                        previewImage(1);
                      }}
                    />
                  </div>
                ) : (
                  ''
                )}
                {imageToPreview === 2 ? (
                  <div>
                    <img
                      src={PUBLIC_URL + 'images/' + props.data.avr.valid_id_2}
                      alt=''
                      className='rounded w-100 px-5'
                      onClick={() => {
                        previewImage(1);
                      }}
                    />
                  </div>
                ) : (
                  ''
                )}
              </>
            </div>
          ) : (
            'Loading...'
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            className='rounded'
            onClick={() => setimageModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
