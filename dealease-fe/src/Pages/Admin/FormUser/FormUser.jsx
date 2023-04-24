import Form from 'react-bootstrap/Form';
import useAddressContext from '../../../Hooks/Context/AddressContext';
import PUBLIC_URL from '../../../api/public_url';
import { useEffect } from 'react';

export const FormUser = ({
  submitHook,
  user,
  setUser,
  updateUserDetails,
  setUpdateUserDetails,
  errors,
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
    edit
      ? setUpdateUserDetails({
          ...updateUserDetails,
          // region: e.target.selectedOptions[0].text,
          region: 'Region III (Central Luzon)',
        })
      : setUser({
          ...user,
          // region: e.target.selectedOptions[0].text
          region: 'Region III (Central Luzon)',
        });

    getProvince(e);
  };

  const city = (e) => {
    edit
      ? setUpdateUserDetails({
          ...updateUserDetails,
          // province: e.target.selectedOptions[0].text,
          province: 'Bulacan',
        })
      : setUser({
          ...user,
          // province: e.target.selectedOptions[0].text
          province: 'Bulacan',
        });
    getCity(e);
  };

  const barangay = (e) => {
    edit
      ? setUpdateUserDetails({
          ...updateUserDetails,
          // city: e.target.selectedOptions[0].text,
          city: 'Obando',
        })
      : setUser({ ...user, city: 'Obando' });
    getBarangay(e);
  };

  const brgy = (e) => {
    edit
      ? setUpdateUserDetails({
          ...updateUserDetails,
          barangay: e.target.selectedOptions[0].text,
        })
      : setUser({ ...user, barangay: e.target.selectedOptions[0].text });
  };

  const userTypeValue = edit
    ? updateUserDetails.role_type === 'Admin'
      ? updateUserDetails.role_type
      : updateUserDetails.is_seller === 'Buyer_Seller' &&
        updateUserDetails.is_buyer === 'Buyer_Seller'
      ? updateUserDetails.role_type
      : updateUserDetails.is_seller === 'Seller'
      ? updateUserDetails.is_seller
      : updateUserDetails.is_buyer
    : 'Select User type';

  useEffect(() => {
    region();
  }, []);

  return (
    <>
      <h1>{edit ? 'Edit' : 'New'} User</h1>

      <Form onSubmit={submitHook} id='createUserForm'>
        <div className='personal-details'>
          <h3>Personal Details</h3>
          <hr />

          {
            <div className='text-center'>
              <img
                src={
                  edit
                    ? typeof updateUserDetails.prof_img === 'object'
                      ? URL.createObjectURL(updateUserDetails.prof_img)
                      : PUBLIC_URL + 'images/' + updateUserDetails.prof_img
                    : typeof user.profile_image === 'object'
                    ? URL.createObjectURL(user.profile_image)
                    : PUBLIC_URL + 'images/' + 'default_profile.jpg'
                }
                className='rounded-circle'
                style={{ objectFit: 'cover', width: '250px', height: '250px' }}
              />
            </div>
          }

          <Form.Group class='mb-3'>
            <Form.Label className='text-dark'>Select Profile Image</Form.Label>
            <Form.Control
              type='file'
              id='formFile'
              className='form-control'
              onChange={(e) => {
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      prof_img: e.target.files[0],
                    })
                  : setUser({ ...user, profile_image: e.target.files[0] });
              }}
              isInvalid={edit ? !!errors.prof_img : !!errors.profile_image}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.profile_image &&
                errors.profile_image.length > 0 &&
                errors.profile_image[0]}
              {errors.prof_img &&
                errors.prof_img.length > 0 &&
                errors.prof_img[0]}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>First Name *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter First Name'
              className='form-control'
              value={edit ? updateUserDetails.first_name : user.first_name}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      first_name: e.target.value,
                    })
                  : setUser({ ...user, first_name: e.target.value })
              }
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.first_name &&
                errors.first_name.length > 0 &&
                errors.first_name[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Middle Name *</Form.Label>
            <Form.Control
              type='text'
              placeholder={edit ? '' : 'Enter Middle Name'}
              value={edit ? updateUserDetails.middle_name : user.middle_name}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      middle_name: e.target.value,
                    })
                  : setUser({ ...user, middle_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Last Name *</Form.Label>
            <Form.Control
              type='text'
              placeholder={edit ? '' : 'Enter Last Name'}
              value={edit ? updateUserDetails.last_name : user.last_name}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      last_name: e.target.value,
                    })
                  : setUser({ ...user, last_name: e.target.value })
              }
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.last_name &&
                errors.last_name.length > 0 &&
                errors.last_name[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Extension Name</Form.Label>
            <Form.Control
              type='text'
              placeholder={edit ? '' : 'Enter Extension Name'}
              value={edit ? updateUserDetails.ext_name : user.ext_name}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      ext_name: e.target.value,
                    })
                  : setUser({ ...user, ext_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Birthday *</Form.Label>
            <Form.Control
              type='date'
              name='birth_date'
              min='1930-01-01'
              max='2012-12-31'
              placeholder={edit ? '' : 'Enter Birth Date'}
              value={edit ? updateUserDetails.birth_date : user.birth_date}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      birth_date: e.target.value,
                    })
                  : setUser({ ...user, birth_date: e.target.value })
              }
              isInvalid={!!errors.birth_date}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.birth_date &&
                errors.birth_date.length > 0 &&
                errors.birth_date[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Contact Number</Form.Label>
            <Form.Control
              type='text'
              name='contact_number'
              placeholder={edit ? '' : 'Enter Contact Number'}
              value={
                edit ? updateUserDetails.contact_number : user.contact_number
              }
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      contact_number: e.target.value,
                    })
                  : setUser({ ...user, contact_number: e.target.value })
              }
              isInvalid={!!errors.contact_number}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.contact_number &&
                errors.contact_number.length > 0 &&
                errors.contact_number[0]}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='address-details'>
          <h3>Address Details</h3>
          <hr />

          <Form.Group className=''>
            <Form.Label className='text-dark'>Region *</Form.Label>
            <Form.Select
              onSelect={region}
              onChange={province}
              value={
                user.region
                  ? user.region
                  : updateUserDetails
                  ? updateUserDetails.region
                  : 'default'
              }
              isInvalid={!!errors.region}
            >
              <option value={'default'} disabled>
                {edit ? updateUserDetails.region : 'Select Region'}
              </option>
              {regionData && (
                // regionData.map((item) => (
                <option
                  key={regionData.region_code}
                  value={regionData.region_code}
                >
                  {regionData.region_name}
                </option>
              )}
            </Form.Select>
            {errors && errors.region ? (
              <Form.Control.Feedback type='invalid'>
                {errors.region}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className='text-dark'>Province *</Form.Label>
            <Form.Select
              onChange={city}
              value={
                user.province
                  ? user.province
                  : updateUserDetails
                  ? updateUserDetails.province
                  : 'default'
              }
              isInvalid={!!errors.province}
            >
              <option value={'default'} disabled>
                {edit ? updateUserDetails.region : 'Select Province'}
              </option>
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
            </Form.Select>
            {errors && errors.province ? (
              <Form.Control.Feedback type='invalid'>
                {errors.province}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className='text-dark'>City/Town *</Form.Label>
            <Form.Select
              onChange={barangay}
              value={
                user.city
                  ? user.city
                  : updateUserDetails
                  ? updateUserDetails.city
                  : 'default'
              }
              isInvalid={!!errors.city}
            >
              <option value={'default'} disabled>
                {edit ? updateUserDetails.city : 'Select City/Town'}
              </option>

              {cityData && (
                // cityData.length > 0 &&
                // cityData.map((item) => (
                <option key={cityData.city_code} value={cityData.city_code}>
                  {cityData.city_name}
                </option>
              )}
            </Form.Select>
            {errors && errors.city ? (
              <Form.Control.Feedback type='invalid'>
                {errors.city}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className=''>
            <Form.Label className='text-dark'>Barangay *</Form.Label>
            <Form.Select
              value={
                user.barangay
                  ? user.barangay
                  : updateUserDetails
                  ? updateUserDetails.barangay
                  : 'default'
              }
              onChange={brgy}
              isInvalid={!!errors.barangay}
            >
              <option value={'default'} disabled>
                {updateUserDetails
                  ? updateUserDetails.barangay
                  : 'Select Barangay'}
              </option>

              {barangayData &&
                barangayData.length > 0 &&
                barangayData.map((item) => (
                  <option key={item.brgy_code} value={item.brgy_code}>
                    {item.brgy_name}
                  </option>
                ))}
            </Form.Select>
            {errors && errors.barangay ? (
              <Form.Control.Feedback type='invalid'>
                {errors.barangay}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Street *</Form.Label>
            <Form.Control
              type='text'
              name='street'
              placeholder={edit ? '' : 'Enter Street'}
              value={edit ? updateUserDetails.street : user.street}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      street: e.target.value,
                    })
                  : setUser({ ...user, street: e.target.value })
              }
              isInvalid={!!errors.street}
            />
            {errors && errors.street ? (
              <Form.Control.Feedback type='invalid'>
                {errors.street}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </div>

        <div className='account-details'>
          <h3>Account Details</h3>
          <hr />

          <Form.Group className='mb-3'>
            <Form.Label className='text-dark'>Email *</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder={edit ? '' : 'Enter Email'}
              value={edit ? updateUserDetails.email : user.email}
              onChange={(e) =>
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      email: e.target.value,
                    })
                  : setUser({ ...user, email: e.target.value })
              }
              isInvalid={!!errors.email}
            />
            {errors && errors.email ? (
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          {edit ? null : (
            <>
              <Form.Group className='mb-3'>
                <Form.Label className='text-dark'>Password *</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={user.password}
                  placeholder='Enter Password'
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  isInvalid={!!errors.password}
                />
                {errors && errors.password ? (
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='text-dark'>
                  Confirm Password *
                </Form.Label>
                <Form.Control
                  type='password'
                  name='password_confirmation'
                  value={user.password_confirmation}
                  placeholder='Re-Enter Password'
                  onChange={(e) =>
                    setUser({ ...user, password_confirmation: e.target.value })
                  }
                  isInvalid={!!errors.password_confirmation}
                />
                {errors && errors.password_confirmation ? (
                  <Form.Control.Feedback type='invalid'>
                    {errors.password_confirmation}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </>
          )}

          <Form.Group className=''>
            <Form.Label className='text-dark'>User type *</Form.Label>
            <Form.Select
              value={
                user.user_type
                  ? user.user_type
                  : updateUserDetails
                  ? updateUserDetails.user_type
                  : 'default'
              }
              onChange={(e) => {
                edit
                  ? setUpdateUserDetails({
                      ...updateUserDetails,
                      user_type: String(e.target.value).toLowerCase(),
                    })
                  : setUser({ ...user, user_type: e.target.value });
              }}
              isInvalid={!!errors.user_type}
            >
              <option value={'default'} disabled>
                {userTypeValue}
              </option>
              <option value={'admin'}>Admin</option>
              <option value={'buyer_seller'}>Buyer + Seller</option>
              <option value={'buyer'}>Buyer</option>
              <option value={'seller'}>Seller</option>
            </Form.Select>
            {errors && errors.user_type ? (
              <Form.Control.Feedback type='invalid'>
                {errors.user_type}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </div>
      </Form>
    </>
  );
};
