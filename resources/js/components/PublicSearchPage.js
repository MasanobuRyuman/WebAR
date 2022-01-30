import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';
import PageButton from './UI/PageButton.js';
import SearchTypeButton from './UI/searchTypeButton.js';
import Header from './UI/Header.js';
import ContentCatalog from './UI/ContentCatalog.js';

export default function PublicSerchPage() {
    const [searchContent, setSearchContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [first,setFirst] = useState(true);
    const [saveName,setSaveName] = useState('');
    const [csrfToken,setCsrfToken] = useState("");
    const [tagDataList,setTagDataList] = useState([]);

    useEffect(()=>{
        getContent()
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
        console.log("getTAglistタグリスト");
        console.log(options);
    }
    useEffect(()=>{
        if (first == true){
            setFirst(false);
        }else{
            setPageButton()
        }
    },[searchContent])
    const getContent = async ()=>{
        let searchType = localStorage.getItem('searchType');
        if (searchType == "タグ"){
            let searchBasedTagList = localStorage.getItem("selectedTagList");

            searchBasedTagList = JSON.parse(searchBasedTagList);
            let formData = new FormData();
            searchBasedTagList.forEach(i=>{
                formData.append("searchBasedTagList[]",i);
            })
            let request = await axios.post(`./api/getSearchContentAPI?page=${nowPage}`,formData);
            setSearchContent(request);
        } else if (searchType == "コンテンツ名"){
            let searchContentName = localStorage.getItem("searchCharacter");
            let formData = new FormData();
            formData.append("searchContentName",searchContentName);
            let gotContent = await axios.post('./api/getContentByContentAPI',formData);
            setSearchContent(gotContent);
        } else if (searchType == "ユーザー名"){
            let searchUserName = localStorage.getItem("searchCharacter");
            const formData = new FormData;
            formData.append("searchUserName",searchUserName);
            let gotContent = await axios.post('./api/getContentByUserAPI',formData);
            setSearchContent(gotContent);
        }
        setTagDataList()
    }
    function setPageButton(){
        let lastPage = searchContent.data.last_page;
        setPaging(PageButton(nowPage,lastPage));
    }
    function move_page(pageNumber){
        setNowPage(pageNumber);
    }
    function addLocalStorageData(saveName){
        localStorage.setItem('saveName', saveName);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
        setSaveName(saveName);
    }
    return(
        <div>
            <Header />
            <SearchTypeButton tagList={tagDataList}/>
            <h1>検索画面</h1>
            <Link to='/'>戻る</Link>
            <ContentCatalog contentData={searchContent} nowPage={nowPage} setNowPage={setNowPage}/>
        </div>
    )
}
