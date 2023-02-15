import { PrimaryBtnStyle } from '../../Components/Button/Button.style';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function Register() {
  const { errors, setErrors, register } = useAuthContext();

  const handleRegister = (e) => {
    e.preventDefault();
    register({});
    console.log('register');
  };

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

        <form className='form' onSubmit={handleRegister}>
          <div className='form-top'>
            <div className='personal-details'>
              <h3>Personal Details</h3>
              <hr />
              <div>
                <div> First Name * </div>
                <div>
                  <input
                    type='text'
                    name='first_name'
                    onChange={(e) => e.target.value}
                    // required
                  />
                </div>
              </div>
              {/* <small className='errMsg'>{errors.first_name[0]}</small> */}

              <div>
                <div> Middle Name </div>
                <div>
                  <input
                    type='text'
                    name='middle_name'
                    onChange={(e) => e.target.value}
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
                    onChange={(e) => e.target.value}
                    // required
                  />
                </div>
              </div>
              <small className='errMsg' v-if='errors.last_name'>
                {/* {errors.last_name[0]} */}
              </small>

              <div>
                <div> Extension Name </div>
                <div>
                  <input
                    type='text'
                    name='name'
                    onChange={(e) => e.target.value}
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
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
              <small className='errMsg' v-if='errors.birthday'>
                {/* {errors.birthday[0]} */}
              </small>

              <div className='mb-1'>
                <div> Contact Number </div>
                <div>
                  <input
                    type='number'
                    id='#number'
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
              <small className='errMsg' v-if='errors.contact_number'>
                {/* {errors.contact_number[0]} */}
              </small>
            </div>

            <div className='address-details'>
              <h3>Address Details</h3>
              <hr />
              <div>
                <div>Region</div>
                <div>
                  <select id='region' onSelect={(e) => e.target.value}>
                    <option></option>
                    <option v-for='region in regions'>
                      {/* {region.region_name} */}
                    </option>
                  </select>
                  <span className='material-symbols-rounded expand_more'>
                    expand_more
                  </span>
                </div>
              </div>
              <small className='errMsg' v-if='errors.region'>
                {/* {errors.region[0]} */}
              </small>

              <div>
                <div>Province</div>
                <div>
                  <select id='province' onSelect={(e) => e.target.value}>
                    {/* <option>{form.province}</option> */}
                    <option v-for='province in provinces'>
                      {/* {province.province_name} */}
                    </option>
                  </select>
                  <span className='material-symbols-rounded expand_more'>
                    expand_more
                  </span>
                </div>
              </div>
              <small className='errMsg' v-if='errors.province'>
                {/* {errors.province[0]} */}
              </small>

              <div>
                <div>City/Town</div>
                <div>
                  <select id='town' onSelect={(e) => e.target.value}>
                    {/* <option>{form.city}</option> */}
                    {/* <option v-for='city in cities'>{city.city_name}</option> */}
                  </select>
                  <span className='material-symbols-rounded expand_more'>
                    expand_more
                  </span>
                </div>
              </div>
              <small className='errMsg' v-if='errors.city'>
                {/* {errors.city[0]} */}
              </small>

              <div>
                <div>Baranggay</div>
                <div>
                  <select id='baranggay' onSelect={(e) => e.target.value}>
                    {/* <option>{form.baranggay}</option> */}
                    <option v-for='baranggay in baranggays'>
                      {/* {baranggay.brgy_name} */}
                    </option>
                  </select>
                  <span className='material-symbols-rounded expand_more'>
                    expand_more
                  </span>
                </div>
              </div>
              <small className='errMsg' v-if='errors.brgy'>
                {/* {errors.brgy[0]} */}
              </small>

              <div className=''>
                <div> Street </div>
                <div>
                  <input
                    type='text'
                    name=''
                    id=''
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
              <small className='errMsg' v-if='errors.street'>
                {/* {errors.street[0]} */}
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
                    onChange={(e) => e.target.value}
                    // required
                  />
                </div>
              </div>
              <small className='errMsg' v-if='errors.email'>
                {/* {errors.email[0]} */}
              </small>

              <div>
                <div>Password * </div>
                <div>
                  <input
                    type='password'
                    name='password'
                    onChange={(e) => e.target.value}
                    // required
                  />
                </div>
              </div>

              <small className='errMsg' v-if='errors.password'>
                {/* {errors.password[0]} */}
              </small>

              <div className='mb-1'>
                <div>Confirm Password * </div>
                <div>
                  <input
                    type='password'
                    name='password_confirmation'
                    onChange={(e) => e.target.value}
                    // required
                  />
                </div>
              </div>
            </div>
          </div>

          <PrimaryBtnStyle
            backgroundColor='#efa726'
            hoverBgColor='#d69215'
            btnTitle='Register'
          >
            <p>
              <span> Register </span>
              <span>
                <span className='material-symbols-rounded spin'>autorenew</span>
                Processing
              </span>
            </p>
          </PrimaryBtnStyle>

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
