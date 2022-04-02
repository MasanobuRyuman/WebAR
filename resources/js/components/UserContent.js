import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import PageButton from './UI/PageButton.js';
import ContentCatalog from './UI/ContentCatalog.js';
import LoginHeader from './UI/LoginHeader.js';
import SearchBox from './UI/SearchBox.js';

function UserContent() {
    const [userContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [saveName,setSaveName] = useState("");
    const [tagDataList,setTagDataList] = useState([]);

    const getUserName = document.getElementById('userName').value;

    useEffect(()=>{
        localStorage.setItem('userName',getUserName);
    },[])

    useEffect(()=>{
        getTagList();
    },[])

    const options = []
    const getTagList = async ()=>{
        const res = await axios.get('/api/getTagAPI');
        res.data.forEach(e => {
            options.push(e.tagName);
        })
        setTagDataList(options);
        console.log(options);
    }

    useEffect(() => {
        getUsers();
    },[nowPage]);


    const getUsers = async () => {
        const serchContent = await axios.get(`/api/userContentAPI?page=${nowPage}`,{ params: { userName: getUserName } });
        setUserContent(serchContent);
        console.log("中身表示");
        console.log(serchContent);
        console.log(serchContent.data.last_page);
    }

    return (
        <div>
            <LoginHeader />
            <SearchBox tagList={tagDataList} pageSource="userContent"/>
            <ContentCatalog contentData={userContent} nowPage={nowPage} setNowPage={setNowPage} userContentFlag="True"/>
        </div>
    )
}
export default withRouter(UserContent);
