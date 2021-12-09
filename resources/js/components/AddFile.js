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
    const [selectTagData,setSelectTagData] = useState([])
    const upload = async () =>{
        let saveName = document.getElementById('contentName').value;
        let release = document.getElementById('public').checked;

        const formData = new FormData();
        formData.append('obj', objData);
        formData.append('mtl', mtlData);
        formData.append('contentName',saveName);
        formData.append('releaseSetting',release);
        formData.append('selectTagData',selectTagData);
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
    const options = [
       { value: 'chocolate', label: 'Chocolate' },
       { value: 'strawberry', label: 'Strawberry' },
       { value: 'vanilla', label: 'Vanilla' }
    ]
    const animatedComponents = makeAnimated();
    function addTagInfo(e){
        let tagList = [];
        e.forEach(i => {
            console.log(i.value);
            tagList.push(i.value);
        });
        setSelectTagData(tagList);

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
                id="tagSelect"
                onChange={addTagInfo}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
            />
            <Link to={'main'} onClick={upload}>送信</Link>
        </div>
    )
}
export default withRouter(AddFile);
