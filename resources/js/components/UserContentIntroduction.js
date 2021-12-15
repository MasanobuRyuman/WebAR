import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function UserContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [contentName,setContentName] = useState('');
    const [tagDataList,setTagDataList] = useState([]);
    const [attachedTagList,setAttachedTagList] = useState([]);
    const [editTagData,setEditTagData] = useState([]);
    const [first,setFirst] = useState(true);
    console.log('userContentIntroduction');
    let saveName = localStorage.getItem("saveName");
    console.log(saveName);
    useEffect(
        async ()=>{
            console.log("contentInfo");
            const formData = new FormData();
            formData.append('saveName',saveName);
            let request = await axios.post('/api/contentInfoAPI',formData);
            //console.log(request);
            //console.log(request.data.contentInfo);
            setContentInfo(request.data.contentInfo);
            //console.log("コンテント");
            //console.log(request.data.contentName.contentName);
            document.getElementById('contentNameDecisionButton').style.display = "none";
            document.getElementById('decisionButton').style.display = "none";
            let photoArray = []
            request.data.contentPhoto.forEach(function(element){
                photoArray.push(element);
            })
            setPhotoData(photoArray);
            setContentName(request.data.contentName.contentName);
            let attachedTag = []
            request.data.tagNameList.forEach(function(element){
                attachedTag.push(element);
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
    useEffect(()=>{
        if (first==true ){
            setFirst(false);
        }else{
            console.log("kitttttta");
            console.log(tagDataList[0]);
            document.getElementById('userContentTagData').defaultValue = [tagDataList[0]];
        }
    },[tagDataList])

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

    const editTag = async()=>{
        console.log("editTag");

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

    const animatedComponents = makeAnimated();

    return(
        <div>
            <h1>紹介ページ</h1>
            <p>コンテンツ名</p>
            <p>{contentName}</p>
            <textarea id="introductionContentNameArea" defaultValue={contentName} readOnly />
            <input type="button" onClick={editContentName} defaultValue="編集" />
            <input id="contentNameDecisionButton" type="button" onClick={changeContentName} defaultValue="決定" />
            <p>タグ</p>
            <Select
                isMulti
                id = 'userContentTagData'
                options={tagDataList}
                closeMenuOnSelect={false}
                components = {animatedComponents}
                onChange = {addTagInfo}
            />
            <input type="button" onClick={editTag} defaultValue="編集" />
            <p>説明</p>
            <input type="button" onClick={editInfo} defaultValue="編集" />
            <input type="button" id="decisionButton" onClick={decision} defaultValue="決定" />
            <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
            <p>コンテンツ写真</p>
            {photoData.map((data,index)=>(
                <div key={data}>
                    <img src={"storage/" + data} alt="not image" title="image" />
                </div>
            ))}
            <Link to="EditPhoto"><input type="button" defaultValue="編集" /></Link>
            <input type="submit" value="AR" />
        </div>
    )
}
