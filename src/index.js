import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

let el = document.getElementById('root');

ReactDOM.render(<Router><HomePage/></Router>, el);

registerServiceWorker();
