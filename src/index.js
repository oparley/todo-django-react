import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import registerServiceWorker from './registerServiceWorker';


let el = document.getElementById('root');

ReactDOM.render(<HomePage tasks={[]}/>, el);

registerServiceWorker();
