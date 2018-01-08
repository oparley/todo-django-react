import React, {Component} from 'react';
import Task from './Task';
import axios from 'axios';
import { LISTS_URL, ENTER_KEY } from './constants';


class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskList: props.taskList,
            tasks: [],
        };

        this.url = LISTS_URL + props.taskList.id;
        this.updateTasks.bind(this);
    }

    componentDidMount(){
        this.updateTasks();
    }

    updateTasks(){
        axios.get(this.url).then((response) => {
            this.setState({
                taskList: response.data
            })
        });
    }

    addTask(){
        console.log('lkbjalkjdaklaj')
    }

    createOrUpdateName(e){
        if(e.key === ENTER_KEY || e.key === undefined){
            let data= {
                name: e.target.value,
            };

            if(this.props.id){
                this.updateName(data)
            } else {
                axios.post(this.url, data).then(
                    () => this.props.onChange()
                )
            }
        }
    }

    deleteList(){
        let confirm = window.confirm("Are you sure? \n All related tasks will be deleted");
        if(confirm){
            axios.delete(this.url).then(
                () => this.props.onChange()
            )
        }
    }

    updateName(data){
        axios.patch(this.url, data).then((response) => {
            this.setState({
                taskList: response.data,
            })
        })
    }

    render(){
        let tasks = '';
        let addTask = '';
        let listName = '';

        addTask = <p onClick={() => this.addTask()} className="button is-link is-outlined">
            Add a task
        </p>

        if(this.props.newList){
            tasks = <div className="field">No tasks here yet</div>

            listName = <div className="field">
                <div className="control">
                    <input className="input is-medium" type="text"
                        defaultValue={this.state.taskList.name}
                        placeholder="Task name"
                        autoFocus
                        onBlur={(e) => this.createOrUpdateName(e)}
                        onKeyDown={(e) => this.createOrUpdateName(e)}/>
                </div>
            </div>

        } else {
            tasks = this.state.taskList.tasks.map((task) =>
                <Task task={task} key={task.id} onChange={() => {this.updateTasks()}}/>
            );
            listName = <p className="title">
                {this.state.taskList.name}
                <button className="button is-danger is-pulled-right" type="button" onClick={() => this.deleteList()} ><i className="far fa-trash-alt"></i></button>
            </p>
        }


        return(
            <div className="tile is-parent">
                <div className="tile is-child box">
                    {listName}

                    <div className="content">
                        {tasks}
                    </div>

                    {addTask}
                </div>
            </div>
        );
    }
}

export default TaskList;
