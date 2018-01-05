import React, {Component} from 'react';
import Task from './Task';
import axios from 'axios';
import { TASKS_URL } from './constants';


class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: props.tasks,
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
            <div className="row">
                <div className="col-lg-5">
                    <div className="row">
                        <h1> Task List </h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {tasks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TaskList
