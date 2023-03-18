import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import '../../assets/scss/header.scss';
import '../../assets/scss/global.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Header(props) {
  // collapsible navlinks
  const { token } = useAuthContext();

  // Solla
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener('resize', showButton);
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Dealease
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {!token ? (
            <>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/products'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
              <li className='nav-item'>
                {button && <Button buttonStyle='btn-outline'>SIGN UP</Button>}
              </li>
              <li>
                <Link
                  to='/sign-up'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            props.children
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
{
  /* <PrimaryBtnStyle
                  backgroundColor="#efa726"
                  hoverBgColor="#d69215"
                  navigateTo="/login"
                  btnTitle="Login"
                  link
                />
                <PrimaryBtnStyle
                  backgroundColor="#efa726"
                  hoverBgColor="#d69215"
                  navigateTo="/seller/login"
                  btnTitle="LoginSeller"
                  link
                />
                <PrimaryBtnStyle
                  backgroundColor="#efa726"
                  hoverBgColor="#d69215"
                  navigateTo="/admin/login"
                  btnTitle="LoginAdmin"
                  link
                />
                <SecondaryBtnStyle
                  backgroundColor="transparent"
                  hoverBgColor="#d69215"
                  navigateTo="/register"
                  btnTitle="Sign Up"
                  link
                />

                <SecondaryBtnStyle
                  backgroundColor="transparent"
                  hoverBgColor="#d69215"
                  navigateTo="/register-exist"
                  btnTitle="Sign Up with exisitng account"
                  link
                /> */
}
