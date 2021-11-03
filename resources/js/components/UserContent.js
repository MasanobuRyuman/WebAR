import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function UserContent() {
    const [userContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const userName = document.getElementById('userName').value;
    useEffect(() => {
        getUsers();
    },[nowPage]);

    const getUsers = async () => {
        const response = await axios.get(`/api/userContentAPI?page=${nowPage}`,{ params: { userName: userName } });
        setUserContent(response);
        console.log("中身表示");
        console.log(response);
        pageButton();
    }

    function add_current_page()
    {
        if(userContent.data.last_page != nowPage){
            setNowPage(nowPage+1);
        }
    }
    function prev_current_page()
    {
        if (nowPage !=1)
        {
            setNowPage(nowPage-1);
        }
    }
    function pageButton()
    {
        let prev = true;
        let outputPage = nowPage;
        let list = [nowPage]
        while (true){
            if (outputPage == 1){
                prev = false;
                outputPage = nowPage;
            }
            if (prev == true){
                outputPage -= 1;
                list.unshift(outputPage);
            }else{
                outputPage += 1;
                list.push(outputPage);
            }
            if (outputPage == 5){
                break;
            }
        }
        setPaging(list)


    }
    return (
        <div>
            <h1>Userペ-ジ</h1>
            {userContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.contentName}</p>
                    <a name={data.contentName}>AR</a>

                </div>
            ))}
            <a onClick={prev_current_page}>前に</a>
            {paging.map((data)=>(
                <a key={data}>{data}</a>
            ))}
            <a onClick={add_current_page}>次に</a>

        </div>
    );
}

export default UserContent;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<UserContent />, document.getElementById('mainPage'));
}
