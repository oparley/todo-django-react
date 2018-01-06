import React, {Component} from 'react';
import Task from './Task';
import axios from 'axios';
import { LISTS_URL } from './constants';


class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
        };

        this.url = LISTS_URL + props.id;
        this.updateTasks.bind(this);
    }

    componentDidMount(){
        this.updateTasks();
    }

    updateTasks(){
        axios.get(this.url).then((response) => {
            this.setState({
                tasks: response.data.tasks
            })
        });
    }

    addTask(){
        console.log('lkbjalkjdaklaj')
    }

    render(){
        let tasks = this.state.tasks.map((task) =>
                <Task task={task} key={task.id} onChange={() => {this.updateTasks()}}/>
            );

        let addTask = <p onClick={() => this.addTask()} className="button is-link is-outlined">
            Add a task
        </p>

        return(
            <div className="tile is-parent is-one-fifth">
                <div className="tile is-child box">
                    <p className="title">
                        Task List
                        <button className="button is-danger is-pulled-right" type="button" ><i className="far fa-trash-alt"></i></button>
                    </p>

                    <div className="content">
                        {tasks}
                    </div>

                    {addTask}
                </div>
            </div>
        );
    }
}

export default TaskList;
