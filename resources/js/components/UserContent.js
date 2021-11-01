import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function UserContent() {

    const [userContent, setUserContent] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/api/userContent');
        setUserContent(response.data);
        console.log("中身表示");
        console.log(response.data.data);
    }

    return (
        <div>
            <h1>Userペ-ジ</h1>
            {userContent?.data?.map((data,index)=>(
                <p key={index}>{data.contentName}</p>
            ))}
        </div>
    );
}

export default UserContent;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<UserContent />, document.getElementById('mainPage'));
}
