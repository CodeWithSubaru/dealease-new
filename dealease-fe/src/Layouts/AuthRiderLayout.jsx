import { Navigate, Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import '../assets/scss/button.scss';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import PUBLIC_PATH from '../api/public_url';

export function AuthRiderLayout() {
  const { user, user_type, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>{user_type === 'Rider' ? <Outlet /> : <Navigate to='/rider/login' />}</>
  );
}