import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
  <Provider store={store}>
    <div className='m-0 p-0 font-mono'>
      <App />
    </div>
  </Provider>
  </>
);
