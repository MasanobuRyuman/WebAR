import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import PageButton from './UI/PageButton.js';

export default function PublicSerchPage() {
    const [searchContent, setSearchContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [first,setFirst] = useState(true);
    const [saveName,setSaveName] = useState('');
    const [csrfToken,setCsrfToken] = useState("");

    useEffect(()=>{
        getContent()
    },[])
    useEffect(()=>{
        if (first == true){
            console.log("fast");
            setFirst(false);
        }else{
            setPageButton()
            console.log("second");
        }
    },[searchContent])
    const getContent = async ()=>{
        console.log("getContent");
        let searchType = localStorage.getItem('searchType');
        console.log(searchType);
        if (searchType == "タグ"){
            console.log("getContentのタグに入った");
            let searchBasedTagList = localStorage.getItem("selectedTagList");

            searchBasedTagList = JSON.parse(searchBasedTagList);
            console.log(searchBasedTagList);
            let formData = new FormData();
            searchBasedTagList.forEach(i=>{
                formData.append("searchBasedTagList[]",i);
            })
            let request = await axios.post(`./api/getSearchContentAPI?page=${nowPage}`,formData);
            console.log(request.data.last_page);
            console.log(request);
            setSearchContent(request);
        } else if (searchType == "コンテンツ名"){
            console.log("コンテンツ名に入った");
            let searchContentName = localStorage.getItem("searchCharacter");
            let formData = new FormData();
            formData.append("searchContentName",searchContentName);
            let gotContent = await axios.post('./api/getContentByContentAPI',formData);
            console.log(gotContent);
            setSearchContent(gotContent);
        } else if (searchType == "ユーザー名"){
            console.log("ユーザー名に入った");
            let searchUserName = localStorage.getItem("searchCharacter");
            const formData = new FormData;
            formData.append("searchUserName",searchUserName);
            let gotContent = await axios.post('./api/getContentByUserAPI',formData);
            console.log(gotContent);
            setSearchContent(gotContent);
        }
    }
    function setPageButton(){
        let lastPage = searchContent.data.last_page;
        console.log("pageButton");
        console.log(nowPage);
        console.log(lastPage);
        console.log(PageButton(nowPage,lastPage));
        setPaging(PageButton(nowPage,lastPage));
    }
    function move_page(pageNumber){
        setNowPage(pageNumber);
    }
    function addLocalStorageData(saveName){
        localStorage.setItem('saveName', saveName);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        console.log(saveName);
        setCsrfToken(csrf_token);
        setSaveName(saveName);
    }
    return(
        <div>
            <h1>検索画面</h1>
            <Link to='/'>戻る</Link>
            <form method="GET" action={`ContentIntroduction/${saveName}`}>
                <input type="hidden" name="_token" value={csrfToken} />
                {searchContent?.data?.data?.map((data,index)=>(
                    <div key={index}>
                        <p>{data.name}</p>
                        <p>{data.contentName}</p>
                        <input type="submit" onClick={() => addLocalStorageData(data.saveName)} value="作品ページ" />
                    </div>
                ))}
                {paging.map((data)=>(
                    <a key={data} onClick={() => move_page(data)}>{data}</a>
                ))}
                <input type="hidden" name="saveName" value={saveName}></input>v
            </form>
        </div>
    )
}
