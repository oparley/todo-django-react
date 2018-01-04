import React, {Component} from 'react';
import Task from './Task';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: props.tasks,
        };
    }

    onChildDelete(newState){
        console.log(newState);
    }

    render(){
        let tasks = this.state.tasks.map((task) =>
            <Task name={task.name} completed={task.completed} key={task.id} id={task.id} callbackParent={this.onChildDelete} />
        );

        return(
            <div className="row">
                <div className="col-lg-5">
                    <div className="row">
                        <h1> Task List </h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {tasks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TaskList
