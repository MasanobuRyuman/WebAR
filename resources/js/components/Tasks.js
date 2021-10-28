import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

export default class Task extends Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        };
    }
    componentDidMount() {
        axios
            .get('/api/tasks')
            .then(response => {
                this.setState({
                    tasks: response.data
                });

            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        const list = this.state.tasks.map((item) => {
            return <li key={item.id}>{item.title}</li>;
        });
        return (
            <div>
                <ul className="task-list">
                    {list}
                    <p>oooooo</p>
                </ul>
            </div>
        );
    }
}

if (document.getElementById('task')) {
    ReactDOM.render(<Task />, document.getElementById('task'));
}
