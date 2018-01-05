import React, {Component} from 'react';
import axios from 'axios';

import { TASKS_URL } from './constants';

class Task extends Component{
    constructor(props){
        super(props);

        this.url = TASKS_URL + props.task.id + '/';

        this.changeName = this.changeName.bind(this);
        this.markAsCompleted = this.markAsCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    markAsCompleted(){
        let completed = !this.props.task.completed
        this.makeRequest('patch', {completed: completed});
    }

    changeName(event){
        let name = event.target.value

        if(name.length > 3 || name.length < 50){
            this.makeRequest('patch', {name: name});
        } else {
            alert('Name must be between three and fifty characters');
        }
    }

    deleteTask(event){
        let confirm = window.confirm("Are you sure?");
        if(confirm){
            this.makeRequest('delete', {});
        }
    }

    makeRequest(method, data){
        axios({
            method: method,
            url: this.url,
            data: data,
        }).then((response) => {
            this.props.onChange()
        })
    }

    render(){
        let task = this.props.task

        let text = <input
            type="text"
            className="form-control"
            onChange={this.changeName}
            value={task.name}
        />;

        if (task.completed) {
            text = <del className="form-control">{task.name}</del>;
        }

        return(
            <div className="input-group mb-3">
                {text}
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button"><i className="far fa-calendar-alt"></i></button>
                    <button onClick={this.markAsCompleted} className="btn btn-success" type="button"><i className="far fa-check-square"></i></button>
                    <button onClick={this.deleteTask} className="btn btn-danger" type="button"><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        );
    }
}

export default Task;
