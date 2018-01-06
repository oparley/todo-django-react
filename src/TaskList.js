import React, {Component} from 'react';
import Task from './Task';
import axios from 'axios';
import { TASKS_URL } from './constants';
import './TaskList.css';


class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            tasks: [],
        };

        this.updateTasks.bind(this);
    }

    componentWillMount(){
        this.updateTasks();
    }

    updateTasks(){
        axios.get(TASKS_URL).then((response) => {
            this.setState({
                tasks: response.data
            })
        });
    }

    render(){
        let tasks = this.state.tasks.map((task) =>
            <Task task={task} key={task.id} onChange={() => {this.updateTasks()}}/>
        );

        return(
            <div className="col task-list">
                <div className="row">
                    <div className="col-8">
                        <h3> Task List </h3>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger float-right" type="button"><i className="far fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {tasks}
                        <div className="row mb-2 pull-right">
                            <div className="col">
                                <button className="btn btn-link" >Add a task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;
