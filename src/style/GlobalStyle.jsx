import { createGlobalStyle } from "styled-components";
import cusorImg from "../image/cursor.png"
import cursorPointerImg from "../image/cusorPointer.png"

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'AsiaCindyNaru';
    src: url('./font/KoreanSDNR-Medium-KSCpc-EUC-H.woff2') format('woff2'),
         url('./font/KoreanSDNR-Medium-KSCpc-EUC-H.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    font-weight: 400;
  }

  @font-face {
    font-family: 'NanumBarunGothic';
    src: url('./font/NanumBarunGothic.woff2') format('woff2');
    src: url('./font/NanumBarunGothic.woff') format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: 'NanumBarunGothic';
    src: url('./font/NanumBarunGothicBold.woff2') format('woff2');
    src: url('./font/NanumBarunGothicBold.woff') format('woff');
    font-weight: 700;
  }

  :root {
    --main-font: 'NanumBarunGothic', sans-serif;
    --sub-font: 'AsiaCindyNaru', sans-serif;
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      cursor: url(${cusorImg}) 2 2, auto;
  }

  a,
  button,
  /* li, */
  .clickable {
    cursor: url(${cursorPointerImg}) 2 2, auto;
    
    *{
      cursor: inherit;
    }
  }

  html, body, #root {
    width: 100%;
  }

  html, body {
      margin: 0;
      padding: 0;
      font-family: var(--main-font);
      font-weight: 400;
  }
  
  html{
     scrollbar-color: #FAF7DE transparent;
  }

  button:focus {
  outline: none;
  }

  button:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .red{
    color: #E56361;
  }

  .blue{
    color: #4E91CB;
  }

  .green{
    color: #C1D548;
  }

  .pink{
    color: #F795A1;
  }

  .orange{
    color: #F29050;
  }

  ::selection{
    color: #80353F;
    background-color: #FFD966;
  }


`

export default GlobalStyle;