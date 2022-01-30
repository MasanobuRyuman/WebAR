import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';
import PageButton from './PageButton.js';

export default function ContentCatalog(props){
    const [userName,setUserName] = useState("");
    const [saveName,setSaveName] = useState("");
    const [contentName,setContentName] = useState("");
    const [csrfToken,setCsrfToken] = useState("");
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    console.log("contentCatalog");
    console.log(props.contentName);
    useEffect(()=>{
        if (firstUseEffect == true){

            setFirstUseEffect(false);
        }else{
            buttonSet();
        }
    },[props.contentData]);

    function insertData(saveName,contentName){
        localStorage.setItem('saveName', saveName);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
        setSaveName(saveName);
        setContentName(contentName);
    }

    function arLink(name,saveName){
        setUserName(name);
        setSaveName(saveName);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
    }

    function buttonSet()
    {
        let lastPage = props.contentData.data.last_page;
        setPaging(PageButton(props.nowPage,lastPage));
    }

    function add_current_page()
    {
        if(props.contentData.data.last_page != props.nowPage){
            props.setNowPage(props.nowPage+1);
        }
    }
    function prev_current_page()
    {
        if (props.nowPage !=1)
        {
            props.setNowPage(props.nowPage-1);
        }
    }

    function move_page(pageNumber){
        props.setNowPage(pageNumber);
    }
    return(
        <Box sx={{
                mt:3,
            }}>
                <form method="GET" action={`ContentIntroduction/${saveName}`}>
                    <input type="hidden" name="_token" value={csrfToken} />
                    <Grid container spacing={2} alignItems="center" justify="center">
                    {props.contentData?.data?.data?.map((data,index)=>(
                        <Grid item xs={4} >
                        <Box key={index} id="contentFrame" sx={{
                            border      : 1,
                            borderRadius: 2,
                            height      : 250,
                            width       : 250,
                            mx          :"auto",
                        }}>
                            <Input type="submit" onClick={() => insertData(data.saveName,data.contentName)} value={data.contentName} />
                            <Typography>{data.name}</Typography>
                        </Box>
                        </Grid>
                    ))}
                    </Grid>
                    <Box sx={{
                        width         : 1,
                        display       : 'flex',
                        justifyContent: "center",
                        alignItems    : "center",
                        mt            :3,
                    }}>
                        <Button type="button" onClick={prev_current_page}>前</Button>
                        {paging.map((data)=>(
                            <Button key={data} onClick={() => move_page(data)} sx={{
                                widht:2,
                            }}>{data}</Button>
                        ))}
                        <Button type="button" onClick={add_current_page}>次</Button>
                    </Box>
                    <input type="hidden" value={userName}></input>
                    <input type="hidden" name="saveName" value={saveName}></input>
                    <input type="hidden" name="contentName" value={contentName}></input>
                </form>
            </Box>
    )
}
