import { createGlobalStyle } from 'styled-components';
import Background from './assets/img/test.png';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin:0 ;
    padding:0 ;
   
    font-family: 'Poppins', sans-serif !important;
    
  }

  html {
    box-sizing: border-box;
  }

  body {
    line-height: 1.6;
    width: 100%;
    height: 100%;
    background-image: url(${Background});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    color: #fffff;
  }

  .primary-bg {
    background: linear-gradient(
      0deg,
      rgba(7, 66, 114, 1) 0%,
      rgba(4, 133, 179, 1) 0%,
      rgba(3, 155, 200, 1) 16%,
      rgba(1, 197, 241, 1) 72%,
      rgba(1, 197, 241, 1) 90%,
      rgba(0, 212, 255, 1) 100%
    );
  }

  .form-control {
    box-shadow: unset;
  }
  
  .nav-item {
    height: 100%;
  }
`;
