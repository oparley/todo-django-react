import React, {Component} from 'react';
import axios from 'axios';

class LoginPage extends Component{
    render(){
        return(
        <div class="modal is-active">
            <div class="box">
                <div className="level"> Login </div>
                <div class="level">
                    <p class="control">
                        <input class="input" type="text" placeholder="username"/>
                    </p>
                </div>
                <div className="level">
                    <p class="control">
                        <input class="input" type="password" placeholder="password"/>
                    </p>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <a onClick={''} className="button is-success">
                            <span>Login</span>
                        </a>
                    </p>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <a onClick={''} className="button is-text">
                            <span>Forgot my password</span>
                        </a>
                    </p>
                    <p className="control">
                        <a onClick={''} className="button is-text">
                            <span>Signup</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
        );
    }
}

export default LoginPage
