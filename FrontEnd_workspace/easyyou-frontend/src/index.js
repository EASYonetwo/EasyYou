import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/CompHeader.css'
import './css/CompMain.css'
import './css/CompFooter.css'
import './css/CompBoardD.css'
import './css/CompLogin.css'
import './css/style.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
