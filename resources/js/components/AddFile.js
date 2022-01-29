import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import UserContent from './UserContent.js';

function AddFile() {
    const [objData,setObjData] = useState("");
    const [mtlData,setMtlData] = useState("");
    const [selectTagData,setSelectTagData] = useState([]);
    const [tagDataList,setTagDataList] = useState([]);
    const [mainPhoto,setMainPhoto] = useState([]);
    useEffect(()=>{
        getTagList();
    },[])
    const getTagList = async ()=>{
        const res = await axios.get('/api/getTagAPI');
        let options = [];
        res.data.forEach(e => {
            console.log(e.tagName);
            options.push({value:e.tagName,label:e.tagName});
        })
        setTagDataList(options);
    }
    const upload = async () =>{
        let saveName = document.getElementById('contentName').value;
        let release = document.getElementById('public').checked;
        let contentMainPhoto = document.getElementById('contentMainPhoto').value;
        console.log("kitakitakita");
        console.log(saveName);
        const formData = new FormData();
        formData.append('obj', objData);
        formData.append('mtl', mtlData);
        formData.append('contentName',saveName);
        formData.append('releaseSetting',release);
        formData.append('mainPhoto',mainPhoto);
        selectTagData.forEach(i=>{
            formData.append("selectTagData[]",i);
        })

        console.log(formData);
        const res = await axios.post(`/api/UploadController`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("きた");
    }

    function objDataUpdate(e){
        setObjData(e.target.files[0]);
    }
    function mtlDataUpdate(e){
        setMtlData(e.target.files[0]);
    }

    function addTagInfo(e){
        let tagList = [];
        e.forEach(i => {
            console.log(i.value);
            tagList.push(i.value);
        });
        setSelectTagData(tagList);
    }
    function addMainPhoto(e){
        setMainPhoto(e.target.files[0]);
    }


    return(
        <div>
            <h1>ファイル追加</h1>
            <Link to={`main`}>ユーザーpage</Link>
            <input id="obj" type="file" name="obj" onChange={objDataUpdate}/>
            <input id="mtl" type="file" name="mtl" onChange={mtlDataUpdate} />
            <p>作品名を入力してください</p>
            <input id="contentName" name="contentName" />
            <input type="radio" id="public" name="releaseSetting" name="public" />
            <label >public</label>
            <input type="radio" id="private" name="releaseSetting" name="private" />
            <label >private</label>
            <Select
                isMulti
                id="tagSelect"
                onChange={addTagInfo}
                closeMenuOnSelect={false}
                components={makeAnimated}
                options={tagDataList}
            />
            <input type="file" id="photoInfo" onChange={addMainPhoto} />
            <Link to={'main'} onClick={upload}>送信</Link>
        </div>
    )
}
export default withRouter(AddFile);
