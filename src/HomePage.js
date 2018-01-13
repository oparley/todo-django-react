import React, { Component } from 'react'
import axios from 'axios';

import TaskList from './TaskList';

import { LISTS_URL, ESC_KEY } from './constants'

class HomePage extends Component{
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

export default HomePage
