import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import PageButton from './PageButton.js';

export default function PublicSerchNamePage() {
    let searchContentName = localStorage.getItem("searchName");
    useEffect(()=>{
        getSearchResult();
    },[]);

    getSearchResult = async()=>{
        const formData = new FormData;
        formData.append(searchContentName);
        serchResult = await axios.post('./api/getSeachContent')
    }
}
