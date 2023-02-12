import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';

function Header() {
  // collapsible navlinks
  const collapse = useRef(null);

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary bg-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand text-light' to='/'>
          Dealease
        </NavLink>
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
            <NavLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
