import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Route } from 'react-router-dom';

import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


import { TASKS_URL } from './constants';

class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {}

        this.url = TASKS_URL + props.id;

    }

    componentDidMount() {
        this.makeRequest('get', {});
    }

    deleteTask(e){
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
            if (method === 'get'){
                this.setState(response.data)
            }
        })
    }

    editTask(key, value){
        let task = {}
        task[key] = value
        this.setState(task)
    }

    saveTask(){
        this.makeRequest('patch', this.state.task);
    }

    render(){
        return(
            <div >
                <section >
                    <p >
                        <b>List </b>
                    </p>
                </section>
                <section >
                    <div className="content">
                        <div className="columns">
                            <div className="column is-half">
                                <div className="columns">
                                    <div className="column">
                                        <label className="label"> Task Name</label>
                                        <input className="input" type="text"
                                            onChange={(e) => this.editTask('name', e.target.value)}
                                            value={this.state.name} />
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <label className="label"> Status</label>
                                        <label className="checkbox">
                                            <input type="checkbox"
                                                onChange={(e) => this.editTask('completed', e.target.checked)}
                                                checked={this.state.completed}/>
                                            Completed
                                        </label>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <label className="label"> Assignee</label>
                                        <input className="input" type="text"
                                            onChange={(e) => this.editTask('user', e.target.value)}
                                            value={this.state.assignee}/>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-half">
                                <div className="field">
                                    <label className="label"> Deadline</label>
                                    <DatePicker inline
                                        onChange={(e) => this.editTask('deadline', moment(e.format())) }
                                        selected={this.state.deadline}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer >
                    <button onClick={(e) => this.saveTask(e)} className="button is-success is-outlined">
                        <span className="icon"><i className="far fa-save"></i></span>
                        <span>Save</span>
                    </button>
                    <button onClick={(e) => this.deleteTask(e)} className="button is-danger is-outlined" type="button">
                        <span className="icon"><i className="far fa-trash-alt"></i></span>
                        <span>Delete</span>
                    </button>
                </footer>
            </div>
        );

    }
}

export default TaskDetail;
