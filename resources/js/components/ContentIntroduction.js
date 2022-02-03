import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button,TextField} from '@mui/material';

export default function ContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [tagDataList,setTagDataList] = useState([]);
    const [attachedTagList,setAttachedTagList] = useState([]);
    const [editTagData,setEditTagData] = useState([]);
    const [csrfToken,setCsrfToken] = useState("");
    const [userName,setUserName] = useState("");
    const [selectedContentTyep,setSelectedContentType] = useState("");

    let saveName = document.getElementById('saveName').value;
    let contentName = document.getElementById('contentName').value;

    useEffect(
        async ()=>{
            console.log("contentInfo");
            const formData = new FormData();
            formData.append('saveName',saveName);
            let request = await axios.post('/api/contentInfoAPI',formData);
            console.log(request);
            //console.log(request.data.contentInfo);
            setContentInfo(request.data.contentInfo);
            //console.log("コンテント");

            document.getElementById('contentNameDecisionButton').style.display = "none";
            document.getElementById('decisionButton').style.display = "none";
            let photoArray = []
            request.data.contentPhoto.forEach(function(element){
                photoArray.push(element);
            })
            setPhotoData(photoArray);

            let attachedTag = []
            request.data.tagNameList.forEach(function(element){
                attachedTag.push({value:element,label:element});
            })
            console.log("attachedTag");
            console.log(attachedTag);
            setAttachedTagList(attachedTag);
            const tagName = await axios.get('/api/getTagAPI');
            let options = []
            tagName.data.forEach(e => {
                console.log(e.tagName);
                options.push({value:e.tagName,label:e.tagName});
            })
            setTagDataList(options);
            console.log(options);
        }
    ,[])

    function editExplanation(){
        document.getElementById('infoArea').readOnly = false;
        document.getElementById('decisionButton').style.display = "";
    }

    function editContentName(){
        console.log("attachedTagList");
        console.log(attachedTagList);
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
    function preparationCamera(contentType){
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
        setSelectedContentType(contentType);
    }

    const animatedComponents = makeAnimated();

    return(
        <div>
            <form method="POST" action={`./../AR`}>
                <Input type="hidden" name="_token" value={csrfToken} />
                <Typography>紹介ページ</Typography>
                <Typography>コンテンツ名</Typography>
                <Typography>{contentName}</Typography>
                <Typography id="introductionContentNameArea" defaultValue={contentName} />
                <Typography>タグ</Typography>
                <div key={attachedTagList}>
                    <Select
                        id = 'userContentTagData'
                        closeMenuOnSelect={false}
                        components = {animatedComponents}
                        defaultValue = {attachedTagList}
                        isMulti
                        options={tagDataList}
                        onChange = {addTagInfo}
                    />
                </div>

                <Typography>説明</Typography>
                <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
                <Typography>コンテンツ写真</Typography>
                {photoData.map((data,index)=>(
                    <div key={data}>
                        <img src={"storage/" + data} alt="not image" title="image" />
                    </div>
                ))}

                <Button type="submit" onClick={()=>preparationCamera("AR")} variant="contained">AR</Button>
                <Button type="submit" onClick={()=>preparationCamera("Object")} variant="contained">オブジェクト</Button>
                <Input type="hidden" value={userName}></Input>
                <Input type="hidden" name="saveName" value={saveName}></Input>
                <Input type="hidden" name="contentType" id="contentType" value={selectedContentTyep}></Input>
                <a href="javascript:window.open('http://twitter.com/share?text='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">Tweet</a>
                <a href="javascript:window.open('http://line.me/R/msg/text/?'+encodeURIComponent(document.title)+'%20'+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">LINE</a>
            </form>
        </div>
    )
}
if (document.getElementById('contentIntroduction')) {
    ReactDOM.render(<ContentIntroduction />, document.getElementById('contentIntroduction'));
}
