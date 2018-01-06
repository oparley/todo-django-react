import React, {Component} from 'react';
import axios from 'axios';
import Modal from './Modal'

import { TASKS_URL } from './constants';

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

    showModal(event){
        this.setState({
            showModal: true,
        })
    }

    render(){
        let task = this.props.task

        let text = <input
            type="text"
            className="input"
            defaultValue={task.name}
            onBlur={this.changeName}
        />;

        if (task.completed) {
            text = <del className="input">{task.name}</del>;
        }

        let classNames = 'modal'

        if(this.state.showModal){
            classNames += 'is-active'
        }

        return(
            <div className="field">
                <Modal>
                <div className={classNames}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                        <h1>Hello World</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>

                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <a className="button is-success">Save changes</a>
                        <a className="button">Cancel</a>
                    </footer>
                    </div>
                </div>
                </Modal>

                <div className="control">
                    <button className="input button" onClick={(e) => this.showModal(e)} id={task.id}>{task.name}</button>
                </div>
            </div>
        );
        /* <div className="input-group-append">
<button className="btn btn-primary" type="button"><i className="far fa-calendar-alt"></i></button>
<button onClick={this.markAsCompleted} className="btn btn-success" type="button"><i className="far fa-check-square"></i></button>
<button onClick={this.deleteTask} className="btn btn-danger" type="button"><i className="far fa-trash-alt"></i></button>
</div> */

    }
}

export default Task;
