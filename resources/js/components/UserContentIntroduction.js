import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';
import makeAnimated from 'react-select/animated';

export default function UserContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [contentName,setContentName] = useState('');
    const [tagDataList,setTagDataList] = useState([]);
    const [attachedTagList,setAttachedTagList] = useState([]);
    const [editTagData,setEditTagData] = useState([]);
    const [selectedContentTyep,setSelectedContentType] = useState("");
    const [tagEdit,setTagEdit] = useState(False);

    let saveName = localStorage.getItem("saveName");
    useEffect(
        async ()=>{
            console.log("UserContentIntroduction");
            const formData = new FormData();
            formData.append('saveName',saveName);
            let request = await axios.post('/api/contentInfoAPI',formData);
            setContentName(request.data.contentName);
            setContentInfo(request.data.contentInfo);
            document.getElementById('contentNameDecisionButton').style.display = "none";
            document.getElementById('decisionButton').style.display = "none";
            let photoArray = []
            request.data.contentPhoto.forEach(function(element){
                photoArray.push(element);
            })
            setPhotoData(photoArray);
            let attachedTag = [];
            request.data.tagNameList.forEach(function(element){
                attachedTag.push(element);
            })

            console.log("attachedTag");
            console.log(attachedTag);
            setAttachedTagList(attachedTag);
            console.log("ここまで");
            const tagName = await axios.get('/api/getTagAPI');
            let options = []
            tagName.data.forEach(e => {
                options.push({value:e.tagName,label:e.tagName});
            })
            setTagDataList(options);
        }
    ,[])

    function editExplanation(){
        document.getElementById('infoArea').readOnly = false;
        document.getElementById('decisionButton').style.display = "";
    }

    const decisionExplanation = async ()=>{
            document.getElementById('infoArea').readOnly = true;
            document.getElementById('decisionButton').style.display = "none";
            let newInfo = document.getElementById('infoArea').value;
            const formData = new FormData();
            formData.append('saveName',saveName);
            formData.append('newInfo',newInfo);
            if (contentInfo == ""){
                axios.post('/api/addContentInfoAPI',formData);
            }else{
                axios.post('/api/editContentInfoAPI',formData);
            }
    }
    function editContentName(){
        document.getElementById('introductionContentNameArea').readOnly = false;
        document.getElementById('contentNameDecisionButton').style.display = "";
    }

    function addTagInfo(e){
        let tagList = [];
        e.forEach(i => {
            console.log(i.value);
            tagList.push(i.value);
        });
        setEditTagData(tagList);
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

    function editTag(){
        setTagEdit(True);
    }

    function TagBox(){
        if(tagEdit == False){
            return(
                <div key={attachedTagList}>
                    <Select
                        value={attachedTagList}
                        renderValue={(selected) => selected.join(', ')}
                    />
                </div>
            )
        }else{
            
            return(
                <div key={attachedTagList}>
                    <Select
                        value={attachedTagList}
                        renderValue={(selected) => selected.join(', ')}
                    />
                </div>
            )
        }
    }



    return(
        <div>
            <h1>紹介ページ</h1>
            <p>コンテンツ名</p>
            <p>{contentName}</p>
            <textarea id="introductionContentNameArea" defaultValue={contentName} readOnly />
            <input type="button" onClick={editContentName} defaultValue="編集" />
            <input id="contentNameDecisionButton" type="button" onClick={changeContentName} defaultValue="決定" />
            <p>タグ</p>

            <TagBox />
            <input type="button" onClick={editTag} defaultValue="編集" />
            <p>説明</p>
            <input type="button" onClick={editExplanation} defaultValue="編集" />
            <input type="button" id="decisionButton" onClick={decisionExplanation} defaultValue="決定" />
            <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
            <p>コンテンツ写真</p>
            {photoData.map((data,index)=>(
                <div key={data}>
                    <img src={"storage/" + data} alt="not image" title="image" />
                </div>
            ))}
            <Link to="EditPhoto"><input type="button" defaultValue="編集" /></Link>
        </div>
    )
}
