import React, {Component} from 'react';

class Task extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'My new task',
            completed: false,
        }

        this.changeName = this.changeName.bind(this);
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

    render(){
        let text = <input
            type="text"
            className="form-control"
            onChange={this.changeName}
            value={this.state.name}
            disabled={this.state.completed}
        />;

        let button_txt = "far fa-check-square";

        if (this.state.completed) {
            text = <del>{text}</del>
            button_txt = "far fa-square"
        }

        return(
            <div className="row">
                <div className="col-lg-5">
                    {text}
                </div>
                <button onClick={() => this.markAsCompleted()} className="col-lg-1 btn btn-primary">
                    <i className={button_txt}></i>
                </button>
            </div>
        );
    }
}

export default Task;
