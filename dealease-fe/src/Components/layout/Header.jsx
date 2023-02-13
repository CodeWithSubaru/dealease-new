import { useRef } from 'react';
import { ButtonStyle, ButtonBorderedStyle } from '../Button/button.style';
import { Nav } from './Header.style';
import { H1 } from '../Helpers/index.style';

function Header() {
  // collapsible navlinks
  const collapse = useRef(null);

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
            <ButtonStyle
              backgroundColor='#efa726'
              hoverBgColor='#d69215'
              btnTitle='Login'
            />

            <ButtonBorderedStyle
              backgroundColor='transparent'
              btnTitle='Sign Up'
            />
          </ul>
        </div>
      </div>
    </Nav>
  );
}

export default Header;
