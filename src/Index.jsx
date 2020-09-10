import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import './assets/fonts/Larsseit/Larsseit.tff';
// import './assets/fonts/Larsseit/Larssseit-Bold.tff';
// import './assets/fonts/Larsseit/Larssseit-ExtraBold.tff';
// import './assets/fonts/Larsseit/Larssseit-Light.tff';
// import './assets/fonts/Larsseit/Larssseit-Thin.tff';
// import './assets/fonts/Larsseit/Larssseit-Medium.tff';
// import './assets/fonts/Larsseit/Larssseit-Italic.tff';

import Router from './Router';
import store from './store/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
