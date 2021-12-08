import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';

export default function UserContentEdit() {
    console.log("userContentEdit");
    let saveName = document.getElementById('saveName').value;
    let contentName = document.getElementById('contentName').value;
    const deleteContent = async () => {
        const formData = new FormData();
        formData.append('saveName',saveName);
        axios.post(`/api/contentDeleteAPI`,formData);
    }

    const editContent = async () => {
        let newContentName = document.getElementById('newContentName').value;
        const formData = new FormData();
        formData.append('newContentName',newContentName);
        formData.append('saveName',saveName);
        axios.post('/api/contentEditAPI',formData)
        .catch(
            (e)=>{
                console.log("API通信失敗",e);
            }
        );
    }

    return(
        <div>
            <Link to={'main'}>ユーザーページに戻る</Link>
            <h1>編集ページ</h1>
            <p>コンテンツ名</p>
            <input id="newContentName" />
            <Link to={'main'} onClick={deleteContent}>削除</Link>
            <Link to={'main'} onClick={editContent}>変更</Link>
        </div>
    )
}
