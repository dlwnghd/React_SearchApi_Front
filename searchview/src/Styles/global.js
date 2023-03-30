import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  html {
    font-size:62.5%
  }

  @media screen and (max-width:768px) {
    html {
      font-size:50%;
    }
  }

  ul, li {
    list-style: none;
  }

  h1 {
    font-size:${({ theme }) => theme.FONT_SIZE.medium}
  }

  h2 {
    font-size:${({ theme }) => theme.FONT_SIZE.huge}
  }

  h2 + p {
    font-size:${({ theme }) => theme.FONT_SIZE.medium}
  }

  h3 {
    font-size:${({ theme }) => theme.FONT_SIZE.medium}
  }

  h3 + p {
    font-size:${({ theme }) => theme.FONT_SIZE.small}
  }

  h4 {
    font-size:${({ theme }) => theme.FONT_SIZE.small}
  }

  h4 + p {
    font-size:${({ theme }) => theme.FONT_SIZE.tiny}
  }

  span {
    font-size:${({ theme }) => theme.FONT_SIZE.small}
  }

  button {
    border: none;
  }

  input {
    border: none;
    :focus-visible {
      outline: none;
    }
  }

  :root {
    --color: white;
    --color--black: #191919;
    --color-white: #ffffff;
    --color-light-gray: #aaaaaa;
    --color-normal-gray: #333333;
    --color-red: #990101;
  }
`
export default GlobalStyles
