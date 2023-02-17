import { useRef } from 'react';

import { PrimaryBtnStyle, SecondaryBtnStyle } from '../Button/button.style';
import { Nav } from './Header.style';
import { H1 } from '../Helpers/index.style';

import useAuthContext from '../../Hooks/Context/AuthContext';

function Header() {
  // collapsible navlinks
  const collapse = useRef(null);
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <H1 className='navbar-brand text-light' to='/'>
          Dealease
        </H1>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => collapse.current.classList.toggle('collapse')}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          ref={collapse}
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            {!user ? (
              <>
                <PrimaryBtnStyle
                  backgroundColor='#efa726'
                  hoverBgColor='#d69215'
                  navigateTo='/login'
                  btnTitle='Login'
                  link
                />

                <PrimaryBtnStyle
                  backgroundColor='#efa726'
                  hoverBgColor='#d69215'
                  navigateTo='/seller/login'
                  btnTitle='LoginSeller'
                  link
                />

                <PrimaryBtnStyle
                  backgroundColor='#efa726'
                  hoverBgColor='#d69215'
                  navigateTo='/admin/login'
                  btnTitle='LoginAdmin'
                  link
                />

                <SecondaryBtnStyle
                  backgroundColor='transparent'
                  hoverBgColor='#d69215'
                  navigateTo='/register'
                  btnTitle='Sign Up'
                  link
                />
              </>
            ) : (
              <>
                {user.first_name} <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </ul>
        </div>
      </div>
    </Nav>
  );
}

export default Header;
