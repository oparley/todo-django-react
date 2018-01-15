import React, {Component} from 'react';
import Task from './Task';
import { API } from './BasePage'
import { Link } from 'react-router-dom';
import { LISTS_URL, ENTER_KEY, ESC_KEY } from './constants';


class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            editList: props.editList,
        };

        if(props.taskList.id){
            this.url = LISTS_URL + props.taskList.id + '/';
        } else {
            this.url = LISTS_URL
        }
    }

    componentDidMount(){
        this.updateTasks();
    }

    updateTasks(){
        API().get(this.url).then((response) => {
            this.setState({
                tasks: response.data.tasks || [],
            })
        });
    }

    createOrUpdateName(e){
        if(e.key === ENTER_KEY || e.key === undefined){
            let data= {
                name: e.target.value,
            };

            let method = 'post'

            if(this.props.taskList.id){
                method = 'patch'
            }

            this.setState({
                editList: false,
            })

            this.updateList(method, data)
        } else if (e.key === ESC_KEY) {
            this.setState({
                editList: false,
            })
        }
    }

    deleteList(){
        let confirm = window.confirm("Are you sure? \nAll related tasks will be deleted");
        if(confirm){
            this.updateList('delete', {})
        }
    }

    updateList(method, data){
        API().request({
            method: method,
            url: this.url,
            data: data,
        }).then((response) => {
            this.props.onChange()
        }).catch(error => console.log(error.response))
    }

    updateName(data){
        API().patch(this.url, data).then((response) => {
            this.setState({
                taskList: response.data,
            })
        })
    }

    editName(e){
        this.setState({
            editList: true,
        })
    }

    render(){
        let tasks = '';
        let addTask = '';
        let listName = '';
        let list = this.props.taskList

        if(this.state.editList){
            listName = <div className="field">
                <div className="control">
                    <input className="input is-medium" type="text"
                        defaultValue={list.name}
                        placeholder="List name"
                        autoFocus
                        onBlur={(e) => this.createOrUpdateName(e)}
                        onKeyDown={(e) => this.createOrUpdateName(e)}/>
                </div>
            </div>

        } else {
            listName = <p className="title">
                <span onClick={(e) => this.editName(e)}>{list.name}</span>
                <button className="button is-danger is-pulled-right"type="button" onClick={() => this.deleteList()} >
                    <i className="far fa-trash-alt"></i>
                </button>
            </p>

            addTask = <Link className="button is-link is-outlined" to={`lists/${list.id}/tasks/new/`}>
                Add a task
            </Link>
        }

        tasks = this.state.tasks.map((task) =>
            <Task task={task} key={task.id} listid={list.id} onChange={() => {this.updateTasks()}}/>
        );

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
