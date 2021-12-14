import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';

export default function UserContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [contentName,setContentName] = useState('');
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
            console.log("コンテント");
            console.log(request.data.contentName.contentName);
            document.getElementById('contentNameDecisionButton').style.display = "none";
            document.getElementById('decisionButton').style.display = "none";
            let photoArray = []
            request.data.contentPhoto.forEach(function(element){
                photoArray.push(element);
            })
            setPhotoData(photoArray);
            setContentName(request.data.contentName.contentName);
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
    const editContentName = async()=>{
        document.getElementById('introductionContentNameArea').readOnly = false;
        document.getElementById('contentNameDecisionButton').style.display = "";
    }

    const changeContentName = async ()=>{
        let newContentName=document.getElementById('introductionContentNameArea').value;
        document.getElementById('introductionContentNameArea').readOnly = true;
        document.getElementById('contentNameDecisionButton').style.display = "none";
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
            <h1>紹介ページ</h1>
            <p>コンテンツ名</p>
            <p>{contentName}</p>
            <textarea id="introductionContentNameArea" value={contentName} readOnly />
            <input type="button" onClick={editContentName} defaultValue="編集" />
            <input id="contentNameDecisionButton" type="button" onClick={changeContentName} defaultValue="決定" />
            <p>説明</p>
            <input type="button" onClick={editInfo} defaultValue="編集" />
            <input type="button" id="decisionButton" onClick={decision} defaultValue="決定" />
            <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
            <p>コンテンツ写真</p>
            {photoData.map((data,index)=>(
                <div key={data}>
                    <img src={"storage/" + data} alt="not image" title="image" />
                </div>
            ))
            }
            <Link to="EditPhoto"><input type="button" defaultValue="編集" /></Link>
            <input type="submit" value="AR" />
        </div>
    )
}
