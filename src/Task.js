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

        this.changeName = this.changeName.bind(this);
        this.markAsCompleted = this.markAsCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    markAsCompleted(){
        let completed = !this.props.task.completed
        this.makeRequest('patch', {completed: completed});
    }

    changeName(e){
        let name = e.target.value
        console.log(name)

        // if(name.length > 3 || name.length < 50){
        //     this.makeRequest('patch', {name: name});
        // } else {
        //     alert('Name must be between three and fifty characters');
        // }
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
                    <button className="delete" aria-label="close"></button>
                </section>
                <section className="modal-card-body">
                    <div className="content">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text"
                                onBlur={(e) => this.changeName(e)}
                                defaultValue={task.name} />
                        </div>
                    </div>
                    <div className="columns">

                            <div className="column">
                                Status <span> {task.completed} </span>
                            </div>
                            <div className="column">
                                <DatePicker inline onChange={(e) => e}
                                    selected={task.deadline}/>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <a className="button is-success"><i className="far fa-save"></i></a>
                    <a className="button" onClick={(e) => this.hideModal(e)}>Cancel</a>
                    <button className="button is-primary" type="button"><i className="far fa-calendar-alt"></i></button>
                    <button onClick={this.deleteTask} className="button is-danger" type="button"><i className="far fa-trash-alt"></i></button>
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
