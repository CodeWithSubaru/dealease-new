import Card from 'react-bootstrap/Card';
import { H1, H3 } from '../../Components/Helpers/index.style';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import PUBLIC_URL from '../../api/public_url';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';
import { Load } from '../../Components/Loader/Load';

export function AnnouncementAdmin() {
  const announcementData = {
    image: '',
    title: '',
    description: '',
  };

  const [announcement, setAnnouncement] = useState(announcementData);
  const [data, setData] = useState([]);
  const [is_published, setIsPublished] = useState(0);

  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIsPublished(0);
    setShow(true);
  };
  const dataMerge = { ...announcement, is_published: is_published };

  function handleSubmit(e) {
    e.preventDefault();

    axiosClient
      .post('/admin/announcement', dataMerge, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => {
          setIsPublished(0);
          setErrors([]);
          handleClose();
          setAnnouncement(data);
          fetchAnnouncement();
        })
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  function handleDeletion(id) {
    axiosClient
      .post('/admin/announcement/delete/' + id)
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => fetchAnnouncement())
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  function handleRestoration(id) {
    axiosClient
      .post('/admin/announcement/restore/' + id)
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => fetchAnnouncement())
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  function handlePublish(id) {
    axiosClient
      .post('/admin/announcement/publish/' + id)
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => fetchAnnouncement())
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  function handleDraft(id) {
    axiosClient
      .post('/admin/announcement/draft/' + id)
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => fetchAnnouncement())
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  function forceDelete(id) {
    axiosClient
      .delete('/admin/announcement/' + id)
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => {
          fetchAnnouncement();
        })
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        })
      );
  }

  const [edit, setEdit] = useState(false);
  const [updateAnnouncement, setUpdateAnnouncement] = useState([]);

  const handleEditClose = () => setEdit(false);
  const handleEditShow = (id) => {
    setUpdateAnnouncement([]);
    setEdit(true);
    editData(id);
  };

  function editData(id) {
    axiosClient.get('/admin/announcement/' + id).then((res) => {
      setUpdateAnnouncement(res.data);
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
    axiosClient
      .post(
        '/admin/announcement/' + updateAnnouncement.id,
        updateAnnouncement,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        }).then(() => {
          setErrors([]);
          handleEditClose();
          fetchAnnouncement();
        })
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then((err) => setErrors(err.response.data.errors))
      );
  }

  function fetchAnnouncement() {
    setLoading(true);
    axiosClient.get('/admin/announcement').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return (
    <div>
      <Card className='w-75 mx-auto'>
        <div className='p-5'>
          <H1 className='text-home mx-5'>Announcement</H1>
          <div className='rounded px-5 text-end'>
            {/* Create Modal */}
            <Button
              variant='primary'
              onClick={handleShow}
              className='mb-3 rounded'
            >
              Create Announcement
            </Button>

            <Modal
              show={show}
              onHide={handleClose}
              size='lg'
              centered
              keyboard
              scrollable
              contentClassName={'mt-0'}
            >
              <Modal.Header closeButton>
                <Modal.Title>New Announcement</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit} id='announcementId'>
                  <div className='text-center'>
                    <img
                      src={
                        typeof announcement.image === 'object'
                          ? URL.createObjectURL(announcement.image)
                          : PUBLIC_URL + 'images/' + 'default_profile.jpg'
                      }
                      className='rounded-circle'
                      style={{
                        objectFit: 'cover',
                        width: '250px',
                        height: '250px',
                      }}
                    />
                  </div>

                  <Form.Group className='mb-3'>
                    <Form.Label className='text-black-50'>
                      Select Announcement Image
                    </Form.Label>
                    <Form.Control
                      type='file'
                      id='formFile'
                      className='form-control'
                      onChange={(e) => {
                        setAnnouncement({
                          ...announcement,
                          image: e.target.files[0],
                        });
                      }}
                      isInvalid={!!errors && !!errors.image}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors &&
                        errors.image &&
                        errors.image.length > 0 &&
                        errors.image[0]}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label className='text-black-50'>Title *</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      onChange={(e) =>
                        setAnnouncement({
                          ...announcement,
                          title: e.target.value,
                        })
                      }
                      isInvalid={!!errors && !!errors.title}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {errors && errors.title && errors.title[0]}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label className='text-black-50'>
                      Description *
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      onChange={(e) =>
                        setAnnouncement({
                          ...announcement,
                          description: e.target.value,
                        })
                      }
                      isInvalid={!!errors && !!errors.description}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors &&
                        errors.description &&
                        errors.description.length > 0 &&
                        errors.description[0]}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='text-black-50'>
                    <Form.Check
                      inline
                      label={
                        <Form.Label className='text-black-50'>
                          Publish
                        </Form.Label>
                      }
                      name='status'
                      type='radio'
                      value='1'
                      onChange={() => setIsPublished(1)}
                    />

                    <Form.Check
                      inline
                      label={
                        <Form.Label className='text-black-50'>Draft</Form.Label>
                      }
                      name='status'
                      type='radio'
                      value='0'
                      onChange={() => setIsPublished(0)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='secondary'
                  onClick={handleClose}
                  className='rounded'
                >
                  Close
                </Button>
                <Button
                  type='submit'
                  form='announcementId'
                  variant='primary'
                  className='rounded'
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <div className='d-flex flex-wrap'>
              {loading ? (
                <div className='d-flex justify-content-center flex-grow-1 mt-5'>
                  <Load />
                </div>
              ) : data && data.length > 0 ? (
                data.map((item) =>
                  item ? (
                    <Card
                      className='d-flex flex-row flex-xs-column w-100 p-2 mt-2 border border-1 border-black-subtle mb-2'
                      key={item.id}
                    >
                      <div className='flex-shrink-1' style={{ width: '150px' }}>
                        <img
                          src={PUBLIC_URL + 'images/' + item.image}
                          alt={item.image ? item.image : ''}
                          className='w-100 rounded'
                          style={{ height: '150px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className='flex-grow-1 d-flex justify-content-between ms-3'>
                        <div>
                          <H3 className='fs-3'>{item.title}</H3>
                          <p>{item.description}</p>
                        </div>
                        <div className='flex-shrink-0 align-self-end'>
                          {/* Edit Modal */}
                          <Button
                            variant='secondary'
                            className='me-2 rounded'
                            onClick={() => handleEditShow(item.id)}
                          >
                            Edit
                          </Button>

                          <Modal
                            show={edit}
                            onHide={handleEditClose}
                            size='lg'
                            centered
                            keyboard
                            scrollable
                            contentClassName={'mt-0'}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Edit Announcement</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {Object.keys(updateAnnouncement).length > 0 ? (
                                <Form
                                  onSubmit={handleUpdate}
                                  id='announcementEditId'
                                >
                                  <div className='text-center'>
                                    <img
                                      src={
                                        typeof updateAnnouncement.image ===
                                        'object'
                                          ? URL.createObjectURL(
                                              updateAnnouncement.image
                                            )
                                          : PUBLIC_URL +
                                            'images/' +
                                            updateAnnouncement.image
                                      }
                                      className='rounded-circle'
                                      style={{
                                        objectFit: 'cover',
                                        width: '250px',
                                        height: '250px',
                                      }}
                                    />
                                  </div>
                                  <Form.Group className='mb-3'>
                                    <Form.Label className='text-black-50'>
                                      Select Announcement Image
                                    </Form.Label>
                                    <Form.Control
                                      type='file'
                                      id='formFile'
                                      className='form-control'
                                      onChange={(e) => {
                                        setUpdateAnnouncement({
                                          ...updateAnnouncement,
                                          image: e.target.files[0],
                                        });
                                      }}
                                      isInvalid={!!errors && !!errors.image}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                      {errors &&
                                        errors.image &&
                                        errors.image.length > 0 &&
                                        errors.image[0]}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group className='mb-3'>
                                    <Form.Label className='text-black-50'>
                                      Title *
                                    </Form.Label>
                                    <Form.Control
                                      type='text'
                                      className='form-control'
                                      value={updateAnnouncement.title}
                                      onChange={(e) =>
                                        setUpdateAnnouncement({
                                          ...updateAnnouncement,
                                          title: e.target.value,
                                        })
                                      }
                                      isInvalid={!!errors && !!errors.title}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                      {errors &&
                                        errors.title &&
                                        errors.title.length > 0 &&
                                        errors.title[0]}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group className='mb-3'>
                                    <Form.Label className='text-black-50'>
                                      Description *
                                    </Form.Label>
                                    <Form.Control
                                      as='textarea'
                                      value={updateAnnouncement.description}
                                      onChange={(e) =>
                                        setUpdateAnnouncement({
                                          ...updateAnnouncement,
                                          description: e.target.value,
                                        })
                                      }
                                      isInvalid={
                                        !!errors && !!errors.description
                                      }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                      {errors &&
                                        errors.description &&
                                        errors.description.length > 0 &&
                                        errors.description[0]}
                                    </Form.Control.Feedback>
                                  </Form.Group>

                                  <Form.Check
                                    inline
                                    label={
                                      <Form.Label className='text-black-50'>
                                        Publish
                                      </Form.Label>
                                    }
                                    name='status'
                                    type='radio'
                                    value='1'
                                    checked={
                                      updateAnnouncement.is_published === 1
                                    }
                                    onChange={() =>
                                      setUpdateAnnouncement({
                                        ...updateAnnouncement,
                                        is_published: 1,
                                      })
                                    }
                                  />

                                  <Form.Check
                                    inline
                                    label={
                                      <Form.Label className='text-black-50'>
                                        Draft
                                      </Form.Label>
                                    }
                                    name='status'
                                    type='radio'
                                    value='0'
                                    checked={
                                      updateAnnouncement.is_published === 0
                                    }
                                    onChange={() =>
                                      setUpdateAnnouncement({
                                        ...updateAnnouncement,
                                        is_published: 0,
                                      })
                                    }
                                  />
                                </Form>
                              ) : (
                                'Loading...'
                              )}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant='secondary'
                                onClick={handleEditClose}
                                className='rounded'
                              >
                                Close
                              </Button>
                              <Button
                                type='submit'
                                form='announcementEditId'
                                variant='primary'
                                className='rounded'
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>

                          {!item.deleted_at && (
                            <Button
                              variant='primary'
                              className='me-2 rounded'
                              onClick={() =>
                                item.is_published
                                  ? handleDraft(item.id)
                                  : handlePublish(item.id)
                              }
                            >
                              {item.is_published ? 'Draft' : 'Publish'}
                            </Button>
                          )}

                          <Button
                            variant={item.deleted_at ? 'info' : 'warning'}
                            onClick={() =>
                              item.deleted_at
                                ? handleRestoration(item.id)
                                : handleDeletion(item.id)
                            }
                            className='me-2 text-white rounded'
                          >
                            {item.deleted_at ? 'Restore' : 'Delete'}
                          </Button>

                          <Button
                            variant='danger'
                            className='me-2 rounded'
                            onClick={() => forceDelete(item.id)}
                          >
                            Force Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    ''
                  )
                )
              ) : (
                <div className='text-center w-100 mt-5'>
                  <p> No Announcement Posted</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
