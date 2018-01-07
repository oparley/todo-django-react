import React, {Component} from 'react';
import axios from 'axios';
import Modal from './Modal'

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

    changeName(event){
        let name = event.target.value
        console.log(name)

        // if(name.length > 3 || name.length < 50){
        //     this.makeRequest('patch', {name: name});
        // } else {
        //     alert('Name must be between three and fifty characters');
        // }
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

    showModal(event){
        this.setState({
            showModal: true,
        })
    }

    hideModal(event){
        if(event.keyCode === ESC_KEY || event.keyCode === undefined){
            this.setState({
                showModal: false,
            })
        }
    }

    render(){
        let task = this.props.task

        let text = <p className="button input" onClick={(e) => this.showModal(e)} id={task.id}>{task.name}</p>

        if (task.completed) {
            text = <del>{text}</del>;
        }

        let classNames = 'modal'

        if(this.state.showModal){
            classNames += ' is-active'
        }

        return(
            <div className="field" onKeyDown={(event) => this.hideModal(event)}>
                <Modal>
                    <div className={classNames} >
                        <div className="modal-background"></div>
                        <div className="modal-card">
                        <section className="modal-card-body">
                            <div className="content">
                                <h1><input className="input" onBlur={(event) => this.changeName(event)} defaultValue={task.name} /></h1>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <a className="button is-success">Save changes</a>
                            <a className="button" onClick={(event) => this.hideModal(event)}>Cancel</a>
                <button className="button is-primary" type="button"><i className="far fa-calendar-alt"></i></button>
                <button onClick={this.deleteTask} className="button is-danger" type="button"><i className="far fa-trash-alt"></i></button>
                        </footer>
                        </div>
                    </div>
                </Modal>

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
