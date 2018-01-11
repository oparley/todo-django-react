import React, {Component} from 'react';
import axios from 'axios';
import Modal from './Modal'
import DatePicker from 'react-datepicker';
// import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


import { TASKS_URL, ESC_KEY } from './constants';

class Task extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
        }

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
        axios({
            method: method,
            url: this.url,
            data: data,
        }).then((response) => {
            this.props.onChange()
        })
    }

    showModal(e){
        this.setState({
            showModal: true,
        })
    }

    hideModal(e){
        if(e.key === ESC_KEY || e.key === undefined){
            this.setState({
                showModal: false,
            })
        }
    }

    editTask(key, value){
        console.log(value.format())
    }

    saveTask(){
        this.makeRequest('patch', this.editedTask);
    }

    render(){
        let task = this.props.task

        let text = <p className="button input" onClick={(e) => this.showModal(e)} id={task.id}>
            {task.name}
        </p>

        if (task.completed) {
            text = <del>{text}</del>;
        }

        let classNames = 'modal'

        if(this.state.showModal){
            classNames += ' is-active'
        }

        let modal = <Modal>
            <div className={classNames} onKeyDown={(e) => this.hideModal(e)} tabIndex="0">
                <div className="modal-background"></div>
                <div className="modal-card">
                <section className="modal-card-head">
                    <p className="modal-card-title">
                        <b>List </b>{this.props.listName}
                    </p>
                    <button className="delete" aria-label="close" onClick={(e) => this.hideModal(e)}></button>
                </section>
                <section className="modal-card-body">
                    <div className="content">
                        <div className="columns">
                            <div className="column is-half">
                                <div className="columns">
                                    <div className="column">
                                        <label className="label"> Task Name</label>
                                        <input className="input" type="text"
                                            onChange={(e) => this.editTask('name', e.target.value)}
                                            value={task.name} />
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <label className="label"> Status</label>
                                        <label className="checkbox">
                                            <input type="checkbox"
                                                onChange={(e) => this.editTask('completed', e.target.value)}
                                                checked={task.completed}/>
                                            Completed
                                        </label>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <label className="label"> Assignee</label>
                                        <input className="input" type="text"
                                            onChange={(e) => this.editTask('user', e.target.value)}
                                            value={task.assignee}/>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-half">
                                <div className="field">
                                    <label className="label"> Deadline</label>
                                    <DatePicker inline
                                        onChange={(e) => this.editTask('deadline', e)}
                                        selected={task.deadline}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
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
            </div>
        </Modal>

        return(
            <div className="field" onKeyDown={(e) => this.hideModal(e)} tabIndex="0">
                {modal}

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
