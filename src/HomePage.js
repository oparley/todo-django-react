import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import TaskList from './TaskList';
import './HomePage.css';
//Login
//Signup
//Recover

class DashBoard extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                    <a className="navbar-brand" href="#">Fixed navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                        </ul>
                    </div>
                </nav>

                <main role="main" className="main container-fluid">
                    <div className="row">
                        <TaskList id={1}/>
                        <TaskList id={2}/>
                        <TaskList id={3}/>
                    </div>
                </main>
            </div>
        );
    }
}

class ProtectedPage extends Component{
    render(){
        return(
            <Router>
                <Route exact path="/" component={DashBoard}/>
            </Router>
        );
    }
}

export default ProtectedPage
