import React from 'react';
import '../../assets/scss/footer.scss';
export function Footer() {
  return (
    <>
      <div className='footer-dark' style={{ zIndex: '9' }}>
        <footer>
          <p className='company-footer'>Powered By Dealease ©</p>
          <p className='copyright'>All Rights Reserved 2023</p>
        </footer>
      </div>
    </>
  );
}
