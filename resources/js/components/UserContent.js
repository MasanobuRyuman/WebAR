import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import PageButton from './UI/PageButton.js';
import ContentCatalog from './UI/ContentCatalog.js';
import LoginHeader from './UI/LoginHeader.js';

function UserContent() {
    const [userContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [saveName,setSaveName] = useState("");
    const getUserName = document.getElementById('userName').value;

    const addLocalStorageData = async(saveName,contentName) =>{
        localStorage.setItem('saveName', saveName);
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
        const serchContent = await axios.get(`/api/userContentAPI?page=${nowPage}`,{ params: { userName: getUserName } });
        setUserContent(serchContent);
        console.log("中身表示");
        console.log(serchContent);
        console.log(serchContent.data.last_page);
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
        let lastPage = userContent.data.last_page;
        setPaging(PageButton(nowPage,lastPage));
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
            <LoginHeader />
            <Link to={`/AddFile`} >コンテンツ追加</Link>
            <ContentCatalog contentData={userContent} nowPage={nowPage} setNowPage={setNowPage} userContentFlag="True"/>
        </div>
    )
}
export default withRouter(UserContent);
