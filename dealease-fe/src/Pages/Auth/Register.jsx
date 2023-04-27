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
import {
  barangays,
  cities,
  provinces,
  regions,
} from 'select-philippines-address';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function Register() {
  const [user, setUser] = useState({
    profile_image: null,
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

  const { errors, setErrors, register } = useAuthContext();

  const handleRegister = (e) => {
    e.preventDefault();
    register(user);
  };

  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const region = () => {
    regions().then((response) => {
      setRegion(response[2]);
    });
  };

  const province = (e) => {
    // setUser({ ...user, region: e.target.selectedOptions[0].text });
    setUser({ ...user, region: 'Region III (Central Luzon)' });
    provinces(e.target.value).then((response) => {
      setProvince(response[1]);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    // setUser({ ...user, province: e.target.selectedOptions[0].text });
    setUser({ ...user, province: 'Bulacan' });
    cities(e.target.value).then((response) => {
      setCity(response[13]);
    });
  };

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

  useEffect(() => {
    region();
    setErrors(null);
  }, []);
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setImage('../../assets/img/default_image.jpg');
    }
  };

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
            className='float-end profile-img'
            alt='preview image'
            src={image}
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
            <div className='px-4 pt-2'>
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
                      // required
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
                      // required
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
                      // required
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
                      // required
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <Row className='px-4 pb-4'>
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
            <Row className='px-4 pt-2'>
              <Col lg={6}>
                <div>
                  <div className='text-white reg-label'>Region</div>
                  <div>
                    <select
                      onChange={province}
                      onSelect={region}
                      className='form-select'
                    >
                      <option>Select Region</option>
                      {regionData && (
                        // regionData.map((item) => (
                        <option
                          key={regionData.region_code}
                          value={regionData.region_code}
                        >
                          {regionData.region_name}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <small className='errMsg' v-if='errors.region'>
                  {errors && errors.region && errors.region[0]}
                </small>
              </Col>
              <Col lg={6}>
                <div>
                  <div className='text-white reg-label'>Province</div>
                  <div>
                    <select
                      onChange={city}
                      defaultValue={'default'}
                      className='form-select'
                    >
                      <option value='default'>Select Province</option>
                      {provinceData && (
                        // provinceData.length > 0 &&
                        // provinceData.map((item) => (
                        <option
                          key={provinceData.province_code}
                          value={provinceData.province_code}
                        >
                          {provinceData.province_name}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <small className='errMsg'>
                  {errors && errors.province && errors.province[0]}
                </small>
              </Col>
            </Row>
            <Row className='px-4'>
              <Col>
                <div>
                  <div className='mt-2 text-white reg-label'>City/Town</div>
                  <div>
                    <select
                      onChange={barangay}
                      defaultValue={'default'}
                      className='form-select'
                    >
                      <option value='default'>Select City</option>
                      {cityData && (
                        // cityData.length > 0 &&
                        // cityData.map((item) => (
                        <option
                          key={cityData.city_code}
                          value={cityData.city_code}
                        >
                          {cityData.city_name}
                        </option>
                      )}
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
                    <select
                      onChange={brgy}
                      defaultValue={'default'}
                      className='form-select'
                    >
                      <option value='default'>Select Barangay</option>
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
            <Row className='px-4 pb-4'>
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
                      // required
                    />
                  </div>
                </div>
                <small className='errMsg' v-if='errors.email'>
                  {errors && errors.email && errors.email[0]}
                </small>
              </Col>
              <Col lg={4}>
                <div>
                  <div className='mt-2 text-white reg-label'>User type</div>
                  <div>
                    <select
                      className='form-select'
                      defaultValue={'default'}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          user_type: e.target.value,
                        })
                      }
                    >
                      <option value={'default'} disabled>
                        Choose an option
                      </option>
                      <option value={'is_buyer 1'}>Buyer</option>
                      <option value={'is_seller 1'}>Seller</option>
                    </select>
                  </div>
                </div>
                <small className='errMsg'>
                  {errors && errors.user_type && errors.user_type[0]}
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
                      // required
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

          {/* <div className='back-to-home-wrapper'>
                <router-link to='/login' className='back-to-home'>
                  Go to Login
                </router-link>
              </div> */}
        </form>
      </div>
    </main>
  );
}
