import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

let el = document.getElementById('root');

let navBar = <nav className="navbar is-link" aria-label="main navigation">
    <div className="navbar-brand">
        <span className="navbar-item">
            <Link className="button is-link" to="/">TO-DO LIST</Link>
        </span>
    </div>
</nav>

const Page = <Router>
    <div>
        {navBar}
        <br/>
        <HomePage/>
    </div>
</Router>

ReactDOM.render(Page, el);

registerServiceWorker();
