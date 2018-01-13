import React, {Component} from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TASKS_URL, USERS_URL } from './constants';

class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            users:[],
            task: {
                name: undefined,
                completed: undefined,
                assignee: undefined,
                deadline: undefined,
                task_list: this.props.listid,
                creator: 1 //CHANGE THIS WHEN I ADD AUTH
            },
        }
        this.url = TASKS_URL;
        this.method = 'post';
    }

    componentDidMount() {
        if(!isNaN(this.props.id)){
            this.url = TASKS_URL + this.props.id + '/';
            this.method = 'patch';
            this.makeRequest('get');
        }

        this.getUsers();
    }

    deleteTask(e){
        let confirm = window.confirm("Are you sure?");
        if(confirm){
            this.makeRequest('delete');
        }
    }

    makeRequest(method = this.method){
        axios({
            method: method,
            url: this.url,
            data: this.state.task,
        }).then((response) => {
            if (method !== 'get'){
                this.setState({redirect: true})
            } else {
                this.setState({task:response.data})
            }
        }).catch((error) => console.log(error.response))
    }

    editTask(key, value){
        let task = this.state.task
        task[key] = value
        this.setState({task: task})
    }

    saveTask(){
        this.makeRequest();
    }

    setDeadline(date){
        let day = moment(date).format('YYYY-MM-DD');
        this.editTask('deadline', day)
    }

    getUsers(){
        axios.get(USERS_URL)
        .then((response) => {
            this.setState({users: response.data})
        })
    }

    render(){
        let deleteButton = <p className="control">
            <a onClick={(e) => this.deleteTask(e)} className="button is-danger">
                <span className="icon"><i className="far fa-trash-alt"></i></span>
                <span>Delete</span>
            </a>
        </p>

        if(isNaN(this.props.id)){
            deleteButton = null
        }

        let el = <div>
            <div className="columns" >
                <div className="column is-three-fifths is-offset-one-fifth">
                    <div className="columns is-multiline">
                        <div className="column is-half">
                            <label className="label"> Task Name</label>
                            <input className="input" type="text" value={this.state.task.name}
                                onChange={(e) => this.editTask('name', e.target.value)}/>
                        </div>
                        <div className="column is-half">
                            <label className="label"> Assignee</label>
                            <Select
                                value={this.state.task.assignee}
                                onChange={(assignee) => this.editTask('assignee', assignee)}
                                options={this.state.users}
                                // loadOptions={() => this.getUsers()}
                                labelKey='username'
                                valueKey='id'/>
                        </div>
                        <div className="column is-half">
                            <label className="label"> Status</label>
                            <label className="checkbox">
                                <input type="checkbox" checked={this.state.task.completed}
                                    onChange={(e) => this.editTask('completed', e.target.checked)}/>
                                Completed
                            </label>
                        </div>
                        <div className="column is-half">
                            <label className="label"> Deadline</label>
                            <Flatpickr
                                options={{
                                    inline: true,
                                    minDate: "today",
                                    dateFormat: 'Y-m-d',
                                }}
                                onChange={(date) => this.setDeadline(date[0])}
                                value={this.state.task.deadline}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
                <p className="control">
                    <Link to="/" className="button is-light">
                        <span className="icon"><i className="fas fa-arrow-left"></i></span>
                        <span>Cancel</span>
                    </Link>
                </p>
                <p className="control">
                    <a onClick={(e) => this.saveTask(e)} className="button is-success">
                        <span className="icon"><i className="far fa-save"></i></span>
                        <span>Save</span>
                    </a>
                </p>
                {deleteButton}
            </div>
        </div>

        if(this.state.redirect){
            el = <Redirect to="/"/>
        }

        return(el);
    }
}

export default TaskDetail;
