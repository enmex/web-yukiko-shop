import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store/index';
import { Layout } from 'antd';
import { FooterComponent } from './components/Footer/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
  <Provider store={store}>
      <Layout>
        <App />
      </Layout>
      <FooterComponent />
  </Provider>
  </>
);