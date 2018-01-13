import React, {Component} from 'react';
import axios from 'axios';

import {AUTH_URL} from './constants'

class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
            },
        }
    }

    updateCredentials(key, value){
        let cred = this.state.credentials
        cred[key] = value
        this.setState({credentials: cred})
    }

    login(){
        axios.post(AUTH_URL, this.state.credentials).then((response) => {
            localStorage.setItem('token', response.data.token)
            this.props.login()
        }).catch((error) => console.log(error.response));
    }

    render(){
        let page = <div className="modal is-active">
            <div className="box">
                <div className="level"> Login </div>
                <div className="level">
                    <p className="control">
                        <input className="input" type="text" placeholder="username"
                            name="username" value={this.state.credentials.name}
                            onChange={(e) => this.updateCredentials('username', e.target.value)}/>
                    </p>
                </div>
                <div className="level">
                    <p className="control">
                        <input className="input" type="password" placeholder="password" name="password"
                            value={this.state.credentials.password}
                            onChange={(e) => this.updateCredentials('password', e.target.value)}/>
                    </p>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <a onClick={() => this.login()} className="button is-success">
                            <span>Login</span>
                        </a>
                    </p>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <a className="button is-text">
                            <span>Forgot my password</span>
                        </a>
                    </p>
                    <p className="control">
                        <a className="button is-text">
                            <span>Signup</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>

        return(page);
    }
}

export default LoginPage
