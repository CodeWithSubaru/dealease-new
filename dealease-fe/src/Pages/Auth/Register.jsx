import { useEffect, useState } from 'react';
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
      setRegion(response);
    });
  };

  const province = (e) => {
    setUser({ ...user, region: e.target.selectedOptions[0].text });
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setUser({ ...user, province: e.target.selectedOptions[0].text });
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setUser({ ...user, city: e.target.selectedOptions[0].text });
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

  return (
    <main>
      <div>
        <h1>Register</h1>

        <div className='register-description mb-1'>
          <p className='register-details'>Please provide your details</p>
          <div>
            <span className='material-symbols-rounded bulb'>
              tips_and_updates
            </span>
            <ul>
              <h4>Take Note:</h4>
              <li>All fields with asterisk (*) are required</li>
            </ul>
          </div>
          <slot name='login-img' />
        </div>

        <form
          className='form'
          onSubmit={handleRegister}
          encType='multipart/form-data'
        >
          <div className='form-top'>
            <div className='personal-details'>
              <h3>Personal Details</h3>

              <hr />
              <div>
                <div htmlFor='upload-img'>Upload Profile Picture</div>
                <input
                  type='file'
                  name='upload-img'
                  onChange={(e) => {
                    setUser({ ...user, profile_image: e.target.files[0] });
                  }}
                  id='upload-img'
                />
              </div>
              <small className='errMsg'>
                {errors && errors.profile_image && errors.profile_image[0]}
              </small>

              <div>
                <div> First Name * </div>
                <div>
                  <input
                    type='text'
                    name='first_name'
                    onChange={(e) =>
                      setUser({ ...user, first_name: e.target.value })
                    }
                    // required
                  />
                </div>
              </div>
              <small className='errMsg'>
                {errors && errors.first_name && errors.first_name[0]}
              </small>

              <div>
                <div> Middle Name </div>
                <div>
                  <input
                    type='text'
                    name='middle_name'
                    onChange={(e) =>
                      setUser({ ...user, middle_name: e.target.value })
                    }
                    // required
                  />
                </div>
              </div>

              <div>
                <div> Last Name * </div>
                <div>
                  <input
                    type='text'
                    name='name'
                    onChange={(e) =>
                      setUser({ ...user, last_name: e.target.value })
                    }
                    // required
                  />
                </div>
              </div>
              <small className='errMsg'>
                {errors && errors.last_name && errors.last_name[0]}
              </small>

              <div>
                <div> Extension Name </div>
                <div>
                  <input
                    type='text'
                    name='name'
                    onChange={(e) =>
                      setUser({ ...user, ext_name: e.target.value })
                    }
                    // required
                  />
                </div>
              </div>

              <div>
                <div> Birthday </div>
                <div>
                  <input
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

              <div className='mb-1'>
                <div> Contact Number </div>
                <div>
                  <input
                    type='number'
                    id='#number'
                    onChange={(e) =>
                      setUser({ ...user, contact_number: e.target.value })
                    }
                  />
                </div>
              </div>
              <small className='errMsg' v-if='errors.contact_number'>
                {errors && errors.contact_number && errors.contact_number[0]}
              </small>
            </div>

            <div className='address-details'>
              <h3>Address Details</h3>
              <hr />
              <div>
                <div>Region</div>
                <div>
                  <select onChange={province} onSelect={region}>
                    <option>Select Region</option>
                    {regionData &&
                      regionData.map((item) => (
                        <option key={item.region_code} value={item.region_code}>
                          {item.region_name}
                        </option>
                      ))}
                  </select>
                  <br />
                </div>
              </div>
              <small className='errMsg' v-if='errors.region'>
                {errors && errors.region && errors.region[0]}
              </small>

              <div>
                <div>Province</div>
                <div>
                  <select onChange={city} defaultValue={'default'}>
                    <option value='default'>Select Province</option>
                    {provinceData &&
                      provinceData.length > 0 &&
                      provinceData.map((item) => (
                        <option
                          key={item.province_code}
                          value={item.province_code}
                        >
                          {item.province_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <small className='errMsg'>
                {errors && errors.province && errors.province[0]}
              </small>

              <div>
                <div>City/Town</div>
                <div>
                  <select onChange={barangay} defaultValue={'default'}>
                    <option value='default'>Select City</option>
                    {cityData &&
                      cityData.length > 0 &&
                      cityData.map((item) => (
                        <option key={item.city_code} value={item.city_code}>
                          {item.city_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <small className='errMsg'>
                {errors && errors.city && errors.city[0]}
              </small>

              <div>
                <div>Barangay</div>
                <div>
                  <select onChange={brgy} defaultValue={'default'}>
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

              <div className=''>
                <div>Street</div>
                <div>
                  <input
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
            </div>
          </div>

          <div className='form-bottom'>
            <div className='account-details'>
              <h3>Account Details</h3>
              <hr />
              <div>
                <div> Email * </div>
                <div>
                  <input
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

              <div>
                <div>Password * </div>
                <div>
                  <input
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

              <div className='mb-1'>
                <div>Confirm Password * </div>
                <div>
                  <input
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

              <div>
                <div>User type</div>
                <div>
                  <select
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
            </div>
          </div>

          <button> Submit </button>

          <div className='back-to-home-wrapper'>
            <router-link to='/login' className='back-to-home'>
              Go to Login
            </router-link>
          </div>
        </form>
      </div>
    </main>
  );
}
