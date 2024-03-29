import React, {Component} from 'react';
import { API } from './BasePage'
import { Link } from 'react-router-dom';

import { TASKS_URL } from './constants';

class Task extends Component{
    constructor(props){
        super(props);

        this.url = TASKS_URL + props.task.id + '/';

        this.markAsCompleted = this.markAsCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    markAsCompleted(){
        let completed = !this.props.task.completed
        this.makeRequest('patch', {completed: completed});
    }

    deleteTask(e){
        let confirm = window.confirm("Are you sure?");
        if(confirm){
            this.makeRequest('delete', {});
        }
    }

    makeRequest(method, data){
        API().request({
            method: method,
            url: this.url,
            data: data,
        }).then((response) => {
            this.props.onChange()
        })
    }

    render(){
        let task = this.props.task

        let text = <Link className="button input" to={`lists/${this.props.listid}/tasks/${task.id}`}>
            {task.name}
        </Link>

        if (task.completed) {
            text = <del>{text}</del>;
        }

        return(
            <div className="field" tabIndex="0">
                <div className="field has-addons">
                    <div className="control is-expanded">
                        {text}
                    </div>
                    <div className="control">
                        <a onClick={this.markAsCompleted} className="button is-success">
                            <i className="far fa-check-square"></i>
                        </a>
                    </div>
                </div>
            </div>
        );

    }
}
export default Task;
