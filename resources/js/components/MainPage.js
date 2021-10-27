import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function MainPage() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/api/user');
        setUsers(response)
    }

    return (
        <div>
            <h1>Userページ</h1>
            <ul>

            </ul>
        </div>
    );
}

export default MainPage;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<MainPage />, document.getElementById('mainPage'));
}
