import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';


function UserContent() {
    const [userContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [saveName,setSaveName] = useState("");
    const getUserName = document.getElementById('userName').value;

    function addSaveName(saveNameTemp){
        localStorage.setItem('saveName', saveNameTemp);
    }

    useEffect(() => {
        getUsers();
    },[nowPage]);

    useEffect(()=>{
        if (firstUseEffect == true){
            console.log("kita");
            setFirstUseEffect(false);
        }else{
            console.log(userContent);
            buttonSet();
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

    function buttonSet()
    {
        let prev = true;
        let outputPage = nowPage;
        let list = [nowPage];
        let pageCount = 0;
        let addprevpage = userContent.data.last_page - outputPage;
        console.log("pageCount");
        while (true){
            console.log(outputPage);
            if (outputPage == 1){
                prev = false;
                outputPage = nowPage;
            } else if(prev == true && pageCount == 5 + (5-addprevpage)){
                prev = false;
                outputPage = nowPage;
            }

            if (prev == true){
                console.log("prevTrue");
                outputPage -= 1;
                pageCount += 1;
                list.unshift(outputPage);
            }else if (outputPage == userContent.data.last_page){
                break;
            }else if (pageCount == 10){
                break;
            }else{
                outputPage += 1;
                pageCount += 1;
                console.log("add");
                list.push(outputPage);
            }
        }
        setPaging(list)
    }

    function arLink(saveName){
        console.log("AR");
        setSaveName(saveName);
    }

    function edit(saveName){
        window.location.href = "/UserContentEdit"; // 通常の遷移
    }
    function ContentEdit(){
        return <h1>編集</h1>;
    }

    function moveAddPage(contentInfo){
        return <h1>ファイル追加</h1>;
    }

    function recordContent(saveName,contentName){
        document.getElementById('saveName').value = saveName;
        document.getElementById('contentName').value = contentName;
    }

    function saveNameKeep(saveName){
        setSaveName(saveName);
    }

    return (
        <div>

            <Link to={`/AddFile`} >コンテンツ追加</Link>

            <a href="addFile">ファイルの追加</a>
            <h1>Userペ-ジ</h1>
            <a href="/">トップページに戻る</a>

            {userContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.name}</p>
                    <p>{data.contentName}</p>
                    <input type="submit" onClick={() => arLink(data.saveName)} value="AR"></input>
                    <Link to={'/UserContentEdit'} onClick={() => recordContent(data.saveName,data.contentName)}>編集</Link>
                    <Link to={'/userContentIntroduction'} onClick={() => addSaveName(data.saveName)}>作品ページ</Link>
                </div>
            ))}
            <a onClick={prev_current_page}>前</a>
            {paging.map((data)=>(
                <a key={data} onClick={() => move_page(data)}>{data}</a>
            ))}
            <a onClick={add_current_page}>次</a>
            <input name="saveName" type="hidden" value={saveName}></input>
        </div>
    )

}

export function getSaveName(saveName){
    return saveName;
};
export default withRouter(UserContent);
