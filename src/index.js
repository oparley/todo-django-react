import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskList from './TaskList';
import registerServiceWorker from './registerServiceWorker';

let tasks = []


for (let index = 0; index < 10; index++) {
    let bla = {
        name: `My task ${index}`,
        completed: index%2 === 0,
        id: index,
    }
    tasks.push(bla);
}

ReactDOM.render(<TaskList tasks={tasks}/>, document.getElementById('root'));
registerServiceWorker();
