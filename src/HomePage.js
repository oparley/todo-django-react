import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
//   Redirect
} from 'react-router-dom';
import TaskList from './TaskList';
import axios from 'axios';
import {LISTS_URL, ESC_KEY} from './constants'

class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            listIds: [],
            renderNew: false,
        }
        this.url = LISTS_URL + 'pks/'
    }

    addList(event){
        this.setState({
            renderNew: true,
        })
    }

    exitAddList(event){
        console.log(event.key)
        if(event.key === ESC_KEY){
            this.setState({
                renderNew: false,
            })
        }
    }

    componentDidMount(){
        axios.get(this.url).then((response) => {
            this.setState({
                listIds: response.data
            })
        });
    }

    mountGrid(){

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
            newList = <TaskList id={''} />
        }


        let lists = this.state.listIds.map((pk) =>
            <div className="column is-one-third" key={pk[0]}>
                <TaskList id={pk[0]}/>
            </div>
        )

        return(
            <div>
                {navBar}
                <br/>

                <main role="main">
                    <div className="container is-fluid">
                        <div className="tile is-ancestor columns is-multiline">
                            <div className="column" tabIndex="0" onKeyDown={(e) => this.exitAddList(e)}>
                                {newList}
                            </div>
                            {lists}
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
