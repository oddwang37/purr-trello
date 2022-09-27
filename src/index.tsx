import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #aa77fc;
  }
  html {
    height: 100vh;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
);
