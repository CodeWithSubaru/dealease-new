import { Navigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuthContext from "../Hooks/Context/AuthContext";
import PUBLIC_PATH from "../api/public_url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SidebarData } from "../Components/Sidebar/Sidebar";
import "../assets/scss/navbar.scss";
// import { GoogleAdSense } from '../Components/GoogleAdSense';

export function AuthSellerLayout() {
  const { user, user_type, logout } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="nav-bar">
        <Link to="#" className="menu-bars">
          <FontAwesomeIcon icon={faBars} onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav_menu " : "nav_menu active"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <FontAwesomeIcon icon={faXmark} onClick={showSidebar} />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="item-title">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {user_type === "Seller" || user_type === "Buyer_seller2" ? (
        <>
          <Outlet />
          {/* <GoogleAdSense /> */}
        </>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
}
// Old Navbar
{
  /* <Header>
 
        <li className='nav-item'>
          <Link to='/seller/home' className='nav-links'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/seller/inbox' className='nav-links'>
            Inbox
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/seller/donation' className='nav-links'>
            Donasyon
          </Link>
        </li>

        <p className='nav-links'>
          {user.seller_wallet ? user.seller_wallet.shell_coin_amount : null}
        </p>
        <li className='nav-item'>
          <div className='div-dropdown'>
            <Dropdown as={ButtonGroup} className='dropdown-button'>
              <Button variant='dark' className='dropdown-logout'>
                <img
                  className='dropdown-logout-profile me-2'
                  src={PUBLIC_PATH + 'images/' + user.prof_img}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'fit',
                  }}
                />{' '}
                {user.first_name}
              </Button>

              <Dropdown.Toggle split variant='dark' id='dropdown-split-basic' />

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={'/seller/profile'}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={'/seller/change-password'}>
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      </Header> */
}
