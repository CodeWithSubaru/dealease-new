import { useEffect, useState } from 'react';
import {
  faChevronRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faEnvelope,
  faEnvelopeSquare,
  faKey,
  faLockOpen,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/register.scss';
import Image from 'react-bootstrap/Image';
import {
  Tabs,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Tab,
  Nav,
} from 'react-bootstrap';
import { barangays } from 'select-philippines-address';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function Register() {
  const [user, setUser] = useState({
    profile_image: null,
    first_name: '',
    middle_name: '',
    last_name: '',
    ext_name: '',
    birth_date: '',
    contact_number: '',
    barangay: '',
    street: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: '',
  });

  const { errors, setErrors, register } = useAuthContext();

  const handleRegister = (e) => {
    e.preventDefault();
    register(user);
  };

  const [barangayData, setBarangay] = useState([]);

  const barangay = (e) => {
    // setUser({ ...user, city: e.target.selectedOptions[0].text });
    setUser({ ...user, city: 'Obando' });
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setUser({ ...user, barangay: e.target.selectedOptions[0].text });
  };

  const [image, setImage] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    barangays('031414').then((barangay) => setBarangay(barangay));
    setImage('../../../images/default_image.png');
    setErrors(null);
  }, []);

  return (
    <main>
      <div>
        <div className='d-flex justify-content-between'>
          <div className='register-description mb-1'>
            <h1 className='text-white fw-bold'>Register</h1>
            <p className='register-details text-white'>
              Please provide your details
            </p>
            <li className='text-white'>
              All fields with asterisk (*) are required
            </li>
          </div>
          <Image
            src={image}
            className='float-end rounded d-flex justify-content-center p-3'
            style={{ height: '150px', width: '150px' }}
          />
        </div>

        <form
          id='registerForm'
          className='form'
          onSubmit={handleRegister}
          encType='multipart/form-data'
        >
          {/* <div className='form-top'> */}
          <div className='personal-details'>
            <Row className='px-4'>
              <Col>
                <div className='pt-2'>
                  <div htmlFor='upload-img' className='text-white reg-label'>
                    Upload Profile Picture
                  </div>
                  <input
                    className='form-control'
                    type='file'
                    name='upload-img'
                    onChange={onImageChange}
                    id='upload-img'
                  />
                </div>
                <small className='errMsg'>
                  {errors && errors.profile_image && errors.profile_image[0]}
                </small>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col lg={6}>
                <div>
                  <div className='mt-2 text-white reg-label'>
                    {' '}
                    First Name <span className='asterisk'>*</span>{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='text'
                      name='first_name'
                      onChange={(e) =>
                        setUser({ ...user, first_name: e.target.value })
                      }
                    />
                  </div>
                  <small className='errMsg'>
                    {errors && errors.first_name && errors.first_name[0]}
                  </small>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <div className='mt-2 text-white reg-label'> Middle Name </div>
                  <div>
                    <input
                      className='form-control'
                      type='text'
                      name='middle_name'
                      onChange={(e) =>
                        setUser({ ...user, middle_name: e.target.value })
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col lg={6}>
                <div>
                  <div className='mt-2 text-white reg-label'>
                    {' '}
                    Last Name <span className='asterisk'>*</span>{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='text'
                      name='name'
                      onChange={(e) =>
                        setUser({ ...user, last_name: e.target.value })
                      }
                    />
                  </div>
                  <small className='errMsg'>
                    {errors && errors.last_name && errors.last_name[0]}
                  </small>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <div className='mt-2 text-white reg-label'>
                    {' '}
                    Extension Name{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='text'
                      name='name'
                      onChange={(e) =>
                        setUser({ ...user, ext_name: e.target.value })
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <Row className='px-4'>
              <Col lg={6}>
                <div>
                  <div className='mt-2 text-white reg-label'> Birthday </div>
                  <div>
                    <input
                      className='form-control'
                      type='date'
                      min='1930-01-01'
                      max='2012-12-31'
                      onChange={(e) =>
                        setUser({ ...user, birth_date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <small className='errMsg'>
                  {errors && errors.birth_date && errors.birth_date[0]}
                </small>
              </Col>
              <Col lg={6}>
                <div className=''>
                  <div className='mt-2 text-white reg-label'>
                    {' '}
                    Contact Number{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='number'
                      id='#number'
                      onChange={(e) =>
                        setUser({
                          ...user,
                          contact_number: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <small className='errMsg' v-if='errors.contact_number'>
                  {errors && errors.contact_number && errors.contact_number[0]}
                </small>
              </Col>
            </Row>
            {/* <Row className='px-4'>
                    <div className='d-flex mt-3 reg-div-button'>
                      <Col lg={6}>
                        <div className='pb-3 pe-2'>
                          <button
                            disabled
                            type='submit'
                            className='btn btn-primary btn-submit'
                          >
                            <FontAwesomeIcon
                              icon={faCircleChevronLeft}
                            />{' '}
                            Previous{' '}
                          </button>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className='pb-3 ps-2'>
                          <button
                            type='submit'
                            className='btn btn-primary btn-submit'
                          >
                            {' '}
                            Next{' '}
                            <FontAwesomeIcon
                              icon={faCircleChevronRight}
                            />
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Row> */}
          </div>

          <div className='address-details'>
            {/* <h3>Address Details</h3> */}
            {/* <hr /> */}
            <Row className='px-4'>
              <Col>
                <div>
                  <div className='mt-2 text-white reg-label'>City/Town</div>
                  <div>
                    <select defaultValue={'default'} className='form-select'>
                      <option value='default'>Obando</option>
                    </select>
                  </div>
                </div>
                <small className='errMsg'>
                  {errors && errors.city && errors.city[0]}
                </small>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col>
                <div>
                  <div className='mt-2 text-white reg-label'>Barangay</div>
                  <div>
                    <select onChange={brgy} className='form-select'>
                      <option>Select Barangay</option>
                      {barangayData &&
                        barangayData.length > 0 &&
                        barangayData.map((item) => (
                          <option key={item.brgy_code} value={item.brgy_code}>
                            {item.brgy_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <small className='errMsg'>
                  {errors && errors.barangay && errors.barangay[0]}
                </small>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col>
                <div>
                  <div className='mt-2 text-white reg-label'>Street</div>
                  <div>
                    <input
                      className='form-control'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) =>
                        setUser({ ...user, street: e.target.value })
                      }
                    />
                  </div>
                </div>
                <small className='errMsg'>
                  {errors && errors.street && errors.street[0]}
                </small>
              </Col>
            </Row>
            {/* <Row className='px-4'>
                    <div className='d-flex mt-3 reg-div-button'>
                      <Col lg={6}>
                        <div className='pb-3 pe-2'>
                          <button
                            type='submit'
                            className='btn btn-primary btn-submit'
                          >
                            {' '}
                            Previous{' '}
                          </button>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className='pb-3 ps-2'>
                          <button
                            type='submit'
                            className='btn btn-primary btn-submit'
                          >
                            {' '}
                            Next{' '}
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Row> */}
          </div>

          {/* </div> */}

          <div className='account-details'>
            {/* <h3>Account Details</h3> */}
            {/* <hr /> */}
            <Row className='px-4'>
              <Col>
                <div>
                  <div className='mt-2 text-white reg-label'>
                    {' '}
                    Email <span className='asterisk'>*</span>{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='email'
                      name='email'
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <small className='errMsg' v-if='errors.email'>
                  {errors && errors.email && errors.email[0]}
                </small>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col>
                <div>
                  <div className='mt-2 text-white reg-label'>
                    Password <span className='asterisk'>*</span>{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='password'
                      name='password'
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <small className='errMsg' v-if='errors.password'>
                  {errors && errors.password && errors.password[0]}
                </small>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col>
                <div className='mb-1'>
                  <div className='mt-2 text-white reg-label'>
                    Confirm Password <span className='asterisk'>*</span>{' '}
                  </div>
                  <div>
                    <input
                      className='form-control'
                      type='password'
                      name='password_confirmation'
                      onChange={(e) =>
                        setUser({
                          ...user,
                          password_confirmation: e.target.value,
                        })
                      }
                      // required
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Row className='px-4'>
            <div className='d-flex mt-3 reg-div-button'>
              {/* <Col lg={6}>
                      <div className='pb-3 pe-2'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-submit'
                        >
                          {' '}
                          Previous{' '}
                        </button>
                      </div>
                    </Col> */}
              {/* <Col>
                <div className='pb-3 ps-2'>
                  <button type='submit' className='btn btn-primary-register'>
                    {' '}
                    Submit{' '}
                  </button>
                </div>
              </Col> */}
            </div>
          </Row>
        </form>
      </div>
    </main>
  );
}
