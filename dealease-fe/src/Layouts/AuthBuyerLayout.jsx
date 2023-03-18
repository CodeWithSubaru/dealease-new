import { Navigate, Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';

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
          <div className='nav-links'>
            {user.first_name}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </li>
      </Header>
      {user_type === 'Buyer' || user_type === 'Buyer_Seller' ? (
        <Outlet />
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}
