import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import getSaveName from './UserContent';

function EditPhoto() {
    const [photoInfo, setPhotoInfo] = useState([]);
    const addPhoto = async ()=>{
        console.log("addPhoto");
        let saveName = localStorage.getItem('saveName');
        console.log("getSaveName");
        console.log(saveName);
        console.log(photoInfo);
        const formData = new FormData();
        formData.append("saveName",saveName);
        formData.append("photoData",photoInfo);
        const ref = await axios.post('/api/addPhotoDataAPI',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    function setPhoto(e){
        setPhotoInfo(e.target.files[0]);
    }

    return(
        <div>
            <h1>写真編集</h1>
            <input type="button" onClick={addPhoto} defaultValue="写真追加" />
            <input type="file" id="photoInfo" onChange={setPhoto} />
         </div>
    )
}
export default withRouter(EditPhoto);
