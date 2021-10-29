import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Pagination from 'react-js-pagination';

function UserContent() {

    const [userContent, setUserContent] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/api/userContent');
        setUserContent(response.data);
        console.log("中身表示");
        console.log(response);
    }


    return (
        <div>
            <h1>Userペ-ジ</h1>
        </div>
    );
}

export default UserContent;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<UserContent />, document.getElementById('mainPage'));
    console.log();
}
