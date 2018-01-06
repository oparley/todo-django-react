import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
//   Redirect
} from 'react-router-dom';
import TaskList from './TaskList';

class DashBoard extends Component{
    addList(){
        console.log('New list')
    }

    render(){
        let newList = <div className="tile is-parent is-one-fifth">
            <div className="tile is-child box">
                <div className="title" onClick={() => this.addList()}>
                    Add a list
                </div>
            </div>
        </div>

        return(
            <div>
                <nav className="navbar is-black" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item">
                            TO-DO LIST
                        </span>

                        <button className="button navbar-burger">
                        </button>
                    </div>
                </nav>
                <br/>

                <main role="main">
                    <div className="container is-fluid">
                        <div className="tile is-ancestor columns">
                            {newList}
                            <TaskList id={1}/>
                        </div>
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
                <Route exact path="/" render={() => <DashBoard/>}/>
            </Router>
        );
    }
}

export default ProtectedPage
