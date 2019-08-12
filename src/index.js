import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import TitlePage from './TitlePage';
import Test from './Test';
import App from './App'


ReactDOM.render(
    <TitlePage />, document.getElementById('root'));
registerServiceWorker();