import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import {LISTS_URL, ESC_KEY} from './constants'

class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            renderNew: false,
            taskLists: [],
        }
    }

    addList(e){
        this.setState({
            renderNew: true,
        })
    }

    exitAddList(e){
        if(e.key === ESC_KEY){
            this.setState({
                renderNew: false,
            })
        }
    }

    componentDidMount(){
        this.updateLists()
    }

    updateLists(){
        axios.get(LISTS_URL).then((response) => {
            this.setState({
                taskLists: response.data
            })
        });
    }

    onCreateList(e){
        this.updateLists()
        this.setState({
            renderNew: false,
        })
    }

    render(){
        let navBar = <nav className="navbar is-black" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item">
                    TO-DO LIST
                </span>

                <button className="button navbar-burger">
                </button>
            </div>
        </nav>

        let newList = <div className="tile is-parent">
            <div className="tile is-child box">
                <div className="title" onClick={(e) => this.addList(e)}>
                    Add a list
                </div>
            </div>
        </div>

        if (this.state.renderNew){
            newList = <TaskList taskList={{id:''}} editList={true} onChange={(e) => this.onCreateList(e)}/>
        }


        let lists = this.state.taskLists.map((list) =>
            <div className="column is-one-third" key={list.id}>
                <TaskList taskList={list} onChange={(e) => this.onCreateList(e)}/>
            </div>
        )

        return(
            <div>
                {navBar}
                <br/>

                <main role="main">
                    <div className="container is-fluid">
                        <div className="tile is-ancestor columns is-multiline">
                            {lists}
                            <div className="column is-one-third" tabIndex="0" onKeyDown={(e) => this.exitAddList(e)}>
                                {newList}
                            </div>
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
            <Switch>
                <Route exact path="/" render={() => <DashBoard/>}/>
                <Route path="/tasks/:id" render={(e) => <TaskDetail id={e.match.params.id}/>}/>
            </Switch>
        );
    }
}

export default ProtectedPage
