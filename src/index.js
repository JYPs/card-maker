import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';

ReactDOM.render(
  // React.StrictMode = 자바스크립트의 'use strict' 와 동일, 엄격!!!!!!!, 배포시에는 활성화 되지 않아서 console에 오류가 안나옴~
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
