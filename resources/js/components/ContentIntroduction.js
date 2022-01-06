import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function ContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [contentName,setContentName] = useState('');
    const [tagDataList,setTagDataList] = useState([]);
    const [attachedTagList,setAttachedTagList] = useState([]);
    const [editTagData,setEditTagData] = useState([]);
    let saveName = document.getElementById('saveName').value;

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




    const animatedComponents = makeAnimated();

    return(
        <div>
            <h1>紹介ページ</h1>
            <p>コンテンツ名</p>
            <p>{contentName}</p>
            <textarea id="introductionContentNameArea" defaultValue={contentName} readOnly />
            <p>タグ</p>
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

            <p>説明</p>
            <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
            <p>コンテンツ写真</p>
            {photoData.map((data,index)=>(
                <div key={data}>
                    <img src={"storage/" + data} alt="not image" title="image" />
                </div>
            ))}

            <input type="submit" value="AR" />
            <input type="submit" value="オブジェクト" />
            <a href="javascript:window.open('http://twitter.com/share?text='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">Tweet</a>
            <a href="javascript:window.open('http://line.me/R/msg/text/?'+encodeURIComponent(document.title)+'%20'+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">LINE</a>
        </div>
    )
}
if (document.getElementById('contentIntroduction')) {
    ReactDOM.render(<ContentIntroduction />, document.getElementById('contentIntroduction'));
}
