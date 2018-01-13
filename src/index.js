import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

let el = document.getElementById('root');

let navBar = <nav className="navbar is-info" aria-label="main navigation">
    <div className="navbar-brand">
        <span className="navbar-item">
            <NavLink to="/">TO-DO LIST</NavLink>
        </span>

        <button className="button navbar-burger">
            <NavLink to="/logout">Logout</NavLink>
        </button>
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
