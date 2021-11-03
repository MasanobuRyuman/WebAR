import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function UserContent() {
    const [userContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [saveName,setSaveName] = useState("");
    const getUserName = document.getElementById('userName').value;
    useEffect(() => {
        getUsers();
    },[nowPage]);

    useEffect(()=>{
        if (firstUseEffect == true){
            console.log("kita");
            setFirstUseEffect(false);
        }else{
            console.log(userContent);
            pageButton();
        }
    },[userContent]);

    const getUsers = async () => {
        const response = await axios.get(`/api/userContentAPI?page=${nowPage}`,{ params: { userName: getUserName } });
        setUserContent(response);
        console.log("中身表示");
        console.log(response);
        console.log(response.data.last_page);
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

    function move_page(pageNumber){
        setNowPage(pageNumber);
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
            }else if (outputPage == userContent.data.last_page){
                break;
            }else{
                outputPage += 1;
                list.push(outputPage);
            }
        }
        setPaging(list)
    }

    function arLink(saveName){
        console.log("AR");
        setSaveName(saveName);
    }

    return (
        <div>
            <h1>Userペ-ジ</h1>

            {userContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.name}</p>
                    <p>{data.contentName}</p>
                    <input type="submit" onClick={() => arLink(data.saveName)} value="AR"></input>
                </div>
            ))}
            <a onClick={prev_current_page}>前</a>
            {paging.map((data)=>(
                <a key={data} onClick={() => move_page(data)}>{data}</a>
            ))}
            <a onClick={add_current_page}　>次</a>
            <input name="saveName" type="hidden" value={saveName}></input>
        
        </div>
    );
}

export default UserContent;
if (document.getElementById('mainPage')) {
    ReactDOM.render(<UserContent />, document.getElementById('mainPage'));
}
