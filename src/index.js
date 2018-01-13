import React from 'react';
import ReactDOM from 'react-dom';
import BasePage from './BasePage';
import registerServiceWorker from './registerServiceWorker';

let el = document.getElementById('root');

ReactDOM.render(<BasePage/>, el);

registerServiceWorker();
