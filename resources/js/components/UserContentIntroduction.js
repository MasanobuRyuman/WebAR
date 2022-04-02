import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import {Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button,TextField,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText,Select} from '@mui/material';
import LoginHeader from './UI/LoginHeader.js';
import TagSearchInput from './UI/TagSearchInput.js';
import { styled } from '@mui/styles';

const ItemText = styled(Typography)({
    fontSize : 20,
    ml       : 10,
});

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
    const [update,setUpdata] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [csrfToken,setCsrfToken] = useState("");

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
            let contentPhoto = request.data.contentPhoto;
            setPhotoData(contentPhoto);
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


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function preparationCamera(contentType){
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
        setSelectedContentType(contentType);
    }



    return(
        <div>
            <LoginHeader />
            <form method="POST" action={`./../AR`}>
                <Input type="hidden" name="_token" value={csrfToken} />
                <Box sx={{
                    mt    :5,
                    mr    :20,
                    ml    :20,
                    border:1,
                    height:50,
                }}>
                    <Typography sx={{
                        textAlign: 'center' ,
                        fontSize:40,
                    }}>紹介ページ</Typography>
                </Box>
                <Box sx={{
                    mt    :5,
                    mr    :20,
                    ml    :20,
                    border:1,
                    height:600,
                }}>
                    <Box>
                    </Box>
                    <Box sx={{
                        display: 'flex' ,
                    }}>
                        <ItemText sx={{
                            fontSize:30,
                            ml:10,
                        }}>コンテンツ名</ItemText>
                        <textarea id="introductionContentNameArea" defaultValue={contentName} readOnly />
                        <Input type="button" onClick={editContentName} defaultValue="編集" />
                        <Input id="contentNameDecisionButton" type="button" onClick={changeContentName} defaultValue="決定" />
                    </Box>
                    <Box sx={{
                        display: 'flex' ,
                    }}>
                        <ItemText>タグ</ItemText>
                        <TagBox />
                        <Input type="button" onClick={editTag} defaultValue="編集" />
                        <Input type="button" onClick={changeTagData} id="tagDecisionButton" value="決定">決定</Input>
                    </Box>
                    <Box sx={{
                        display: 'flex' ,
                    }}>
                        <ItemText>説明</ItemText>
                        <Input type="button" onClick={editExplanation} defaultValue="編集" />
                        <Input type="button" id="decisionButton" onClick={decisionExplanation} defaultValue="決定" />
                    </Box>

                    <textarea id="infoArea" defaultValue={contentInfo} readOnly></textarea>
                    <ItemText>コンテンツ写真</ItemText>
                    <Box
                        component="img"
                        sx={{
                          height: 200,
                          width: 230,
                          maxHeight: { xs: 200, md: 167 },
                          maxWidth: { xs: 230, md: 250 },
                          mx      :"auto",
                        }}
                        alt="The house from the offer."
                        src={"./../storage/" + photoData}
                    />
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
                    <Link to="EditPhoto"><Input type="button" defaultValue="編集" /></Link>
                    <Button type="submit" onClick={()=>preparationCamera("AR")} variant="contained">AR</Button>
                    <Button type="submit" onClick={()=>preparationCamera("Object")} variant="contained">オブジェクト</Button>
                    <Input type="hidden" value={userName}></Input>
                    <Input type="hidden" name="saveName" value={saveName}></Input>
                    <Input type="hidden" name="contentType" id="contentType" value={selectedContentTyep}></Input>
                </Box>
            </form>

        </div>
    )
}
