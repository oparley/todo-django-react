import React, { Component } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import TaskDetail from './TaskDetail'
import HomePage from './HomePage'
import Reports from './Reports'


import { isAuthenticated } from './helpers';



class BasePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            authenticated: isAuthenticated(),
        }
    }

    logout(){
        localStorage.removeItem('token')
        this.setState({authenticated: false})
    }

    login(){
        this.setState({authenticated: true})
    }

    render(){
        let navBar = <nav className="navbar is-link" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item">
                    <Link className="button is-link" to="/">TO-DO LIST</Link>
                </span>
            </div>

            <div className="navbar-end">
                <span className="navbar-item">
                    <Link className="button is-link" to="/reports">Reports</Link>
                </span>
                <div className="navbar-item">
                    <a onClick={() => this.logout() }className="button is-link"> Log out </a>
                </div>
            </div>
        </nav>

        let mainContent = <div>
            {navBar}

            <br/>
            <Switch>
                <Route exact path="/" render={() => <HomePage/>}/>
                <Route exact path="/lists/:listid/tasks/:id" render={(e) =>
                    <TaskDetail listid={e.match.params.listid} id={e.match.params.id}/>}
                    />
                <Route exact path="/reports" render={() => <Reports />} />
                <Redirect to="/"/>
            </Switch>
        </div>

        if(!this.state.authenticated){
            mainContent = <Switch>
                <Route exact path="/login" render={() =>
                    <LoginPage authenticated={this.state.authenticated} login={() => this.login()} /> }
                />
                <Route exact path="/signup" render={() =>
                    <SignupPage /> }
                />
                {/* <Route exact path="/recover" render={() =>
                    <LoginPage authenticated={this.state.authenticated} login={() => this.setState({authenticated: true})} /> }
                /> */}
                <Redirect to="/login"/>
            </Switch>
        }

        return(
        <Router>
            {mainContent}
        </Router>

    );}
}

export let API = () => {
    let token = localStorage.getItem('token')
    if(token){
        return axios.create({
            headers: {
                Authorization: `Token ${token}`
            },
        })
    }
    return axios
};

export default BasePage;
