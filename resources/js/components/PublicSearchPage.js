import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';

export default function PublicSerchPage() {
    const [searchContent, setsearchContent] = useState([]);
    useEffect(()=>{
        getContent()
    },[])
    const getContent = async ()=>{
        let searchBasedTagList = localStorage.getItem("searchBasedTag");
        searchBasedTagList = JSON.parse(searchBasedTagList);

        console.log(searchBasedTagList);
        let formData = new FormData();
        searchBasedTagList.forEach(i=>{
            formData.append("searchBasedTagList[]",i.tagName);
        })

        let request = await axios.post("./api/getSearchContentAPI",formData);
        console.log(request);
        setsearchContent(request);
    }
    return(
        <h1>検索画面</h1>

    )
}
