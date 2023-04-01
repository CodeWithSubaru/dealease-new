import { createGlobalStyle } from "styled-components";
import Background from "./assets/img/2.png";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  body {
    font-family: 'Rubik', sans-serif;
    line-height: 1.6;
    width: 100%;
    height: 100%;
    background-image: url(${Background});
   
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    color: #fff;
  }
`;
