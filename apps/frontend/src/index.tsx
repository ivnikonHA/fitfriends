import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/app';
import { Provider } from 'react-redux';
import { store, checkAuthAction  } from '@fitfriends/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
