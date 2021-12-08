import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';

export default function UserContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    console.log('userContentIntroduction');
    let saveName = localStorage.getItem("saveName");
    console.log(saveName);
    useEffect(
        async ()=>{
            console.log("contentInfo");
            const formData = new FormData();
            formData.append('saveName',saveName);
            let request = await axios.post('/api/contentInfoAPI',formData);
            console.log(request);
            console.log(request.data.contentInfo);
            setContentInfo(request.data.contentInfo);
            document.getElementById('decisionButton').style.display = "none";
        }

    ,[])

    function editInfo(){
        document.getElementById('infoArea').readOnly = false;
        document.getElementById('decisionButton').style.display = "";
    }

    const decision = async ()=>{
            console.log("decision");
            document.getElementById('infoArea').readOnly = true;
            document.getElementById('decisionButton').style.display = "none";
            let newInfo = document.getElementById('infoArea').value;
            const formData = new FormData();
            formData.append('saveName',saveName);
            formData.append('newInfo',newInfo);
            axios.post('/api/editContentInfoAPI',formData);
    }
    return(
        <div>
            <h1>紹介ページ</h1>
            <p>説明</p>
            <input type="button" onClick={editInfo} defaultValue="編集" />
            <input type="button" id="decisionButton" onClick={decision} defaultValue="決定" />
            <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
            <p>コンテンツ写真</p>
            <Link to="EditPhoto"><input type="button" defaultValue="編集" /></Link>
            <input type="submit" value="AR" />
        </div>
    )
}
