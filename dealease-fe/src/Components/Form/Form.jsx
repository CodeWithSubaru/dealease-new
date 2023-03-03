import Form from 'react-bootstrap/Form';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useAddressContext from '../../Hooks/Context/AddressContext';

export const FormCreate = ({
  submitHook,
  user,
  setUser,
  errors,
  setErrors,
  edit,
}) => {
  const {
    regionData,
    provinceData,
    cityData,
    barangayData,
    getProvince,
    getCity,
    getBarangay,
    region,
  } = useAddressContext();

  const province = (e) => {
    setUser({ ...user, region: e.target.selectedOptions[0].text });
    getProvince(e);
  };

  const city = (e) => {
    setUser({ ...user, province: e.target.selectedOptions[0].text });
    getCity(e);
  };

  const barangay = (e) => {
    setUser({ ...user, city: e.target.selectedOptions[0].text });
    getBarangay(e);
  };

  const brgy = (e) => {
    setUser({ ...user, barangay: e.target.selectedOptions[0].text });
  };

  return (
    <div>
      <h1>New User</h1>
      <Form className='form' onSubmit={submitHook}>
        <div className='personal-details'>
          <h3>Personal Details</h3>
          <hr />

          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter First Name'
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='middleName'>
            <Form.Label>Middle Name *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Middle Name'
              onChange={(e) =>
                setUser({ ...user, middle_name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Last Name'
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.last_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='extensionName'>
            <Form.Label>Extension Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Extension Name'
              onChange={(e) => setUser({ ...user, ext_name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='birthDate'>
            <Form.Label>Birthday *</Form.Label>
            <Form.Control
              type='date'
              name='birth_date'
              min='1930-01-01'
              max='2012-12-31'
              onChange={(e) => setUser({ ...user, birth_date: e.target.value })}
              isInvalid={!!errors.birth_date}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.birth_date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='contactNumber'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Contact Number'
              name='extension_name'
              onChange={(e) =>
                setUser({ ...user, contact_number: e.target.value })
              }
              isInvalid={!!errors.contact_number}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.contact_number}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='address-details'>
          <h3>Address Details</h3>
          <hr />

          <Form.Group className=''>
            <Form.Label className=''>Region *</Form.Label>
            <Form.Select
              defaultValue={'default'}
              onSelect={region}
              onChange={province}
              className={errors.region ? 'is-invalid' : ''}
            >
              <option value='default' disabled>
                Select Region
              </option>
              {regionData &&
                regionData.map((item) => (
                  <option key={item.region_code} value={item.region_code}>
                    {item.region_name}
                  </option>
                ))}
            </Form.Select>
            {errors.region ? (
              <Form.Control.Feedback type='invalid'>
                {errors.region}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className=''>Province *</Form.Label>
            <Form.Select
              defaultValue={'default'}
              onChange={city}
              className={errors.province ? 'is-invalid' : ''}
            >
              <option value='default' disabled>
                Select Province
              </option>
              {provinceData &&
                provinceData.length > 0 &&
                provinceData.map((item) => (
                  <option key={item.province_code} value={item.province_code}>
                    {item.province_name}
                  </option>
                ))}
            </Form.Select>
            {errors.province ? (
              <Form.Control.Feedback type='invalid'>
                {errors.province}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className=''>City/Town *</Form.Label>
            <Form.Select
              defaultValue={'default'}
              onChange={barangay}
              className={errors.city ? 'is-invalid' : ''}
            >
              <option value='default' disabled>
                Select City/Town
              </option>
              {cityData &&
                cityData.length > 0 &&
                cityData.map((item) => (
                  <option key={item.city_code} value={item.city_code}>
                    {item.city_name}
                  </option>
                ))}
            </Form.Select>
            {errors.city ? (
              <Form.Control.Feedback type='invalid'>
                {errors.city}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className=''>Barangay *</Form.Label>
            <Form.Select
              defaultValue={'default'}
              onChange={brgy}
              className={errors.barangay ? 'is-invalid' : ''}
            >
              <option value='default' disabled>
                Select City/Town
              </option>
              {barangayData &&
                barangayData.length > 0 &&
                barangayData.map((item) => (
                  <option key={item.brgy_code} value={item.brgy_code}>
                    {item.brgy_name}
                  </option>
                ))}
            </Form.Select>
            {errors.barangay ? (
              <Form.Control.Feedback type='invalid'>
                {errors.barangay}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className='mb-3' controlId='street'>
            <Form.Label>Street *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Street'
              onChange={(e) => setUser({ ...user, street: e.target.value })}
              isInvalid={!!errors.street}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.street}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='account-details'>
          <h3>Account Details</h3>
          <hr />

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter Email'
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter Password'
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type='password'
              name='password_confirmation'
              placeholder='Enter Password'
              onChange={(e) =>
                setUser({ ...user, password_confirmation: e.target.value })
              }
              isInvalid={!!errors.password_confirmation}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password_confirmation}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className=''>User type *</Form.Label>
            <Form.Select
              defaultValue={'default'}
              onChange={(e) =>
                setUser({
                  ...user,
                  user_type: e.target.value,
                })
              }
              className={errors.user_type ? 'is-invalid' : ''}
            >
              <option value='default' disabled>
                Select User Type
              </option>
              <option value={'is_buyer 1'}>Buyer</option>
              <option value={'is_seller 1'}>Seller</option>
            </Form.Select>
            {errors.user_type ? (
              <Form.Control.Feedback type='invalid'>
                {errors.user_type}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </div>
        <button>Create</button>
        {/* <PrimaryBtnStyle
          backgroundColor='#efa726'
          hoverBgColor='#d69215'
          btnTitle='Create'
        /> */}
      </Form>
    </div>
  );
};
