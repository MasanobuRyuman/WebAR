import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function UserContent() {
    const [publicContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const userName = document.getElementById('userName').value;
    useEffect(() => {
        getUsers();
    },[nowPage]);

    const getUsers = async () => {
        const response = await axios.get(`/api/userContentAPI?page=${nowPage}`,{ params: { userName: userName } });
        setUserContent(response);
        console.log("中身表示");
        console.log(response);
    }

    function add_current_page(){
        setNowPage(nowPage+1);
        //useEffect();
    }
    return (
        <div>
            <h1>Userペ-ジ</h1>
            {publicContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.contentName}</p>
                    <a name={data.contentName}>AR</a>
                </div>
            ))}
            <a onClick={add_current_page}>次に</a>


        </div>
    );
}

export default UserContent;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<UserContent />, document.getElementById('mainPage'));
}
