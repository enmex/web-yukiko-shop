import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Gill Sans", sans-serif;
  }
`;

root.render(
  <>
  <Global/>
  <App />
  </>
);
