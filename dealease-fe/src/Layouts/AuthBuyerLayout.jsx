import { Navigate, Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import PUBLIC_PATH from '../api/public_url';

export function AuthBuyerLayout() {
  const { user, user_type, logout } = useAuthContext();
  const closeMobileMenu = () => setClick(false);
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header>
        {/* Modified Solla */}
        <li className='nav-item'>
          <Link to='/' className='nav-links'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/inbox' className='nav-links'>
            Inbox
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/profile' className='nav-links'>
            Profile
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/change-password' className='nav-links'>
            Change Password
          </Link>
        </li>
        <li className='nav-item'>
          <div className='nav-links'>
            {user ? (
              <>
                <img
                  src={PUBLIC_PATH + 'images/' + user.prof_img}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'fit',
                  }}
                />
                <p> {user.first_name}</p>
              </>
            ) : (
              <p>Loading ...</p>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </li>
      </Header>
      {user_type === 'Buyer' || user_type === 'Buyer_seller1' ? (
        <Outlet />
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}
