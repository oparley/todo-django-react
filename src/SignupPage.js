import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


import { USERS_URL } from './constants'

class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
                password_confirm: '',
                email: '',
            },
            errors: undefined,
            completed: false,
        }
    }

    updateCredentials(key, value){
        let cred = this.state.credentials
        cred[key] = value
        this.setState({credentials: cred})
    }

    signup(){
        let credentials = this.state.credentials;
        if(credentials.password !== credentials.password_confirm){
            this.setState({errors: {password: "Passwords don't match"}})
        } else {
            axios.post(USERS_URL, this.state.credentials).then((response) => {
                this.setState({completed: true})
            }).catch((error) => console.log(error.response));
        }
    }

    render(){
        let page = <div className="modal is-active notification is-link">
            <div className="box">
                <div className="level"> <h1>Sign Up </h1></div>
                <div className="level">
                    <p className="control">
                        <input className="input" type="text" placeholder="username"
                            name="username" value={this.state.credentials.name}
                            onChange={(e) => this.updateCredentials('username', e.target.value)}/>
                    </p>
                </div>
                <div className="level">
                    <p className="control">
                        <input className="input" type="email" placeholder="email" name="email"
                            value={this.state.credentials.email}
                            onChange={(e) => this.updateCredentials('email', e.target.value)}/>
                    </p>
                </div>
                <div className="level">
                    <p className="control">
                        <input className="input" type="password" placeholder="password" name="password"
                            value={this.state.credentials.password}
                            onChange={(e) => this.updateCredentials('password', e.target.value)}/>
                    </p>
                </div>
                <div className="level">
                    <p className="control">
                        <input className="input" type="password" placeholder="confirm password" name="password"
                            value={this.state.credentials.password_confirm}
                            onChange={(e) => this.updateCredentials('password_confirm', e.target.value)}/>
                    </p>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <Link to="/login" className="button is-text">
                            <span>Cancel</span>
                        </Link>
                    </p>
                    <p className="control">
                        <a onClick={() => this.signup()} className="button is-success">
                            <span>Signup</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>

        if(this.state.completed){
            page = <Redirect to="/login" />
        }

        return(page);
    }
}

export default LoginPage
