import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';
import makeAnimated from 'react-select/animated';
import TagSearchInput from './UI/TagSearchInput.js';

export default function UserContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [contentName,setContentName] = useState('');
    const [tagDataList,setTagDataList] = useState([]);
    const [attachedTagList,setAttachedTagList] = useState([]);
    const [editTagData,setEditTagData] = useState([]);
    const [selectedContentTyep,setSelectedContentType] = useState("");
    const [tagEdit,setTagEdit] = useState("false");
    const [selectedTagList, setSelectedTagList] = React.useState([]);
    const [update,setUpdata]=useState(true);

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
            document.getElementById('tagDecisionButton').style.display = "none";
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
            setSelectedTagList(attachedTag);
            const tagName = await axios.get('/api/getTagAPI');
            let options = []
            tagName.data.forEach(e => {
                options.push({value:e.tagName,label:e.tagName});
            })
            setTagDataList(options);
        }
    ,[update])

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

    const changeContentName = async()=>{
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
        setTagEdit("true");
        document.getElementById('tagDecisionButton').style.display = "";
    }

    function TagBox(){
        if(tagEdit == "false"){
            return(
                <div key={attachedTagList}>
                    <Select
                        value={attachedTagList}
                        renderValue={(selected) => selected.join(',')}
                    />
                </div>
            )
        }else{
            document.getElementById('infoArea').readOnly = true;
            return(
                <TagSearchInput id="UserContentTagInfo" tagList={tagDataList} selectedTag={selectedTagList} setSelectedTag={setSelectedTagList} sx={{
                    width:300,
                }}/>
            )
        }
    }

    const changeTagData = async()=>{
        let formData = new FormData;
        console.log("selectedTagList");
        console.log(selectedTagList);
        selectedTagList.forEach(i=>{
            formData.append("selectedTagList[]",i);
        })
        formData.append("saveName",saveName);
        axios.post("./api/editTagAPI",formData);
        setTagEdit("false");
        document.getElementById('tagDecisionButton').style.display = "none";
        console.log("ここまできている");
        setUpdata(update?false:true);
    }

    return(
        <div>
            <h1>紹介ページ</h1>
            <p>コンテンツ名</p>
            <p>{contentName}</p>
            <textarea id="introductionContentNameArea" defaultValue={contentName} readOnly />
            <Input type="button" onClick={editContentName} defaultValue="編集" />
            <Input id="contentNameDecisionButton" type="button" onClick={changeContentName} defaultValue="決定" />
            <p>タグ</p>

            <TagBox />
            <Input type="button" onClick={editTag} defaultValue="編集" />
            <Input type="button" onClick={changeTagData} id="tagDecisionButton" value="決定">決定</Input>
            <p>説明</p>
            <Input type="button" onClick={editExplanation} defaultValue="編集" />
            <Input type="button" id="decisionButton" onClick={decisionExplanation} defaultValue="決定" />
            <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
            <p>コンテンツ写真</p>
            {photoData.map((data,index)=>(
                <div key={data}>
                    <img src={"storage/" + data} alt="not image" title="image" />
                </div>
            ))}
            <Link to="EditPhoto"><Input type="button" defaultValue="編集" /></Link>
            <h1>{update}</h1>
        </div>
    )
}
