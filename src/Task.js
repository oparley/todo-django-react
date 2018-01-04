import React, {Component} from 'react';

class Task extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            completed: props.completed,
            id: props.id,
        };

        this.changeName = this.changeName.bind(this);
        this.markAsCompleted = this.markAsCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    markAsCompleted(){
        this.setState({
            completed: !this.state.completed,
        });
    }

    changeName(event){
        this.setState({
            name: event.target.value
        });
    }

    deleteTask(event){
        let confirm = window.confirm("Are you sure?")
        if(confirm){
            this.props.callbackParent(this.state.id);
        }
    }

    render(){
        let text = <input
            type="text"
            className="form-control"
            onChange={this.changeName}
            value={this.state.name}
        />;

        if (this.state.completed) {
            text = <del className="form-control">{this.state.name}</del>;
        }

        return(
            <div className="input-group mb-3">
                {text}
                <div className="input-group-append">
                    <button onClick={this.markAsCompleted} className="btn btn-primary" type="button"><i className="far fa-check-square"></i></button>
                    <button onClick={this.deleteTask} className="btn btn-danger" type="button"><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        );
    }
}

export default Task;
