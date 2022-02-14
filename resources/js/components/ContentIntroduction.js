import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button,TextField,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText} from '@mui/material';

export default function ContentIntroduction() {
    const [contentInfo, setContentInfo] = useState('');
    const [photoData,setPhotoData] = useState([]);
    const [tagDataList,setTagDataList] = useState([]);
    const [attachedTagList,setAttachedTagList] = useState([]);
    const [editTagData,setEditTagData] = useState([]);
    const [csrfToken,setCsrfToken] = useState("");
    const [userName,setUserName] = useState("");
    const [selectedContentTyep,setSelectedContentType] = useState("");
    const [open, setOpen] = React.useState(false);

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

            console.log("写真データ");
            console.log(request.data.contentPhoto);
            setPhotoData(request.data.contentPhoto);

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



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <Box
                    component="img"
                    sx={{
                        height: 300,
                        width: 230,
                        maxHeight: { xs: 300, md: 167 },
                        maxWidth: { xs: 230, md: 250 },
                        mx      :"auto",
                    }}
                    alt="The house from the offer."
                    src={"./../../storage/" + photoData}
                />

                <Button type="submit" onClick={()=>preparationCamera("AR")} variant="contained">AR</Button>
                <Button type="submit" onClick={()=>preparationCamera("Object")} variant="contained">オブジェクト</Button>
                <Input type="hidden" value={userName}></Input>
                <Input type="hidden" name="saveName" value={saveName}></Input>
                <Input type="hidden" name="contentType" id="contentType" value={selectedContentTyep}></Input>
                <a href="javascript:window.open('http://twitter.com/share?text='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">Tweet</a>
                <a href="javascript:window.open('http://line.me/R/msg/text/?'+encodeURIComponent(document.title)+'%20'+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">LINE</a>

                <Button variant="outlined" onClick={handleClickOpen}>
                    AR用のタグ
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"AR用のマーカー"}
                    </DialogTitle>
                    <DialogContent>
                        <Box
                            component="img"
                            sx={{
                                height: 300,
                                width: 230,
                                maxHeight: { xs: 300, md: 167 },
                                maxWidth: { xs: 230, md: 250 },
                                mx      :"auto",
                            }}
                            alt="The house from the offer."
                            src={"./../storage/ar_marker/pattern-marker.png"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <a href="./../storage/ar_marker/0d7338bc-1a4f-4ee8-bcba-843f9f292748.pdf" download>ダウンロード</a>
                        <Button onClick={handleClose} autoFocus>
                            閉じる
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </form>
        </div>
    )
}
if (document.getElementById('contentIntroduction')) {
    ReactDOM.render(<ContentIntroduction />, document.getElementById('contentIntroduction'));
}
