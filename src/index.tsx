import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persister, store } from './app/store/index';
import { FooterComponent } from './components/Footer/Footer';
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from './components/Loading/Loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
  <Provider store={store}>
    <PersistGate loading={<Loading/>} persistor={persister}>
      <App />
      <FooterComponent />
    </PersistGate>
  </Provider>
  </>
);