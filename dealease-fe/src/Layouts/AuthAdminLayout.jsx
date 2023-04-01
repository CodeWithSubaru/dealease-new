import { Navigate, Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import '../assets/scss/button.scss';
export function AuthAdminLayout() {
  const { user, user_type, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header>
        {/* Modified Solla */}
        <li className='nav-item'>
          <Link to='/admin/dashboard' className='nav-links'>
            Home
          </Link>
        </li>
        {user_type === 'Admin' && (
          <>
            <li className='nav-item'>
              <Link to='/admin/users' className='nav-links'>
                Users
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/admin/inbox' className='nav-links'>
                Inbox
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/admin/profile' className='nav-links'>
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <div className='nav-links'>
                {user.first_name}
                <button className='button-30' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          </>
        )}
      </Header>
      {user_type === 'Admin' ? <Outlet /> : <Navigate to='/admin/login' />}
    </>
  );
}
