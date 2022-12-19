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
    line-height: 1.47;
    min-height: 100%;
    font-family: PT Sans,Helvetica,Arial,sans-serif;
  }
`;

root.render(
  <>
  <Global/>
  <App />
  </>
);
