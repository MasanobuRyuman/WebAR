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
        setUsers(response.data);
        console.log("中身表示");
        console.log(response.data);
    }

    return (
        <div>
            <h1>Userペ-ジ+{users.name}</h1>
        </div>
    );
}

export default MainPage;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<MainPage />, document.getElementById('mainPage'));
    console.log();
}
