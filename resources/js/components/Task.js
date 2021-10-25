import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Task extends Component {
    render() {
        return (
            <div>
                <p>タスク</p>
            </div>
        );
    }
}

if (document.getElementById('task')) {
    ReactDOM.render(<Task />, document.getElementById('task'));
}
