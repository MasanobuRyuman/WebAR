import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SearchTypeButton from './UI/searchTypeButton.js';
import PageButton from './UI/PageButton.js';
import Header from './UI/Header.js';

function PublicContent() {
    const [publicContent,setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [userName,setUserName] = useState("");
    const [saveName,setSaveName] = useState("");
    const [contentName,setContentName] = useState("");
    const [csrfToken,setCsrfToken] = useState("");
    const [searchBasedTagData,setSelectTagData] = useState([]);
    const [tagDataList,setTagDataList] = useState([]);
    const [searchType,setSearchType] = useState('');


    useEffect(()=>{
        getTagList();
    },[])

    const options = []
    const getTagList = async ()=>{
        const res = await axios.get('/api/getTagAPI');
        res.data.forEach(e => {
            options.push(e.tagName);
        })
        setTagDataList(options);
    }

    useEffect(() => {
        getUsers();
    },[nowPage]);

    useEffect(()=>{
        if (firstUseEffect == true){

            setFirstUseEffect(false);
        }else{
            buttonSet();
        }
    },[publicContent]);
    const getUsers = async () => {
        const response = await axios.get(`/api/publicContentAPI?page=${nowPage}`);
        setUserContent(response);
    }

    function add_current_page()
    {
        if(publicContent.data.last_page != nowPage){
            setNowPage(nowPage+1);
        }
    }
    function prev_current_page()
    {
        if (nowPage !=1)
        {
            setNowPage(nowPage-1);
        }
    }

    function move_page(pageNumber){
        setNowPage(pageNumber);
    }

    function buttonSet()
    {
        let lastPage = publicContent.data.last_page;
        setPaging(PageButton(nowPage,lastPage));
    }

    function arLink(name,saveName){
        setUserName(name);
        setSaveName(saveName);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
    }

    function addTagInfo(e){
        let tagList = [];
        e.forEach(i => {
            tagList.push(i.value);
        });
        setSelectTagData(tagList);
    }

    function setSearchBasedTag(){
        var searchBasedTagList = [];
        searchBasedTagData.forEach(i=>{
            searchBasedTagList.push({tagName:i})
        });


        localStorage.setItem('searchBasedTag', JSON.stringify(searchBasedTagList));
    }
    function setSearchBasedName(){
        let searchName = document.getElementByid("seachName").value;
        localStorage.setItem("searchName",serchName);
    }



    function insertData(saveName,contentName){
        localStorage.setItem('saveName', saveName);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
        setSaveName(saveName);
        setContentName(contentName);
    }

    return (
        <div>
            <Header />
            <SearchTypeButton tagList={tagDataList}/>
            <Box sx={{
                mt:3,
            }}>
                <form method="GET" action={`ContentIntroduction/${saveName}`}>
                    <input type="hidden" name="_token" value={csrfToken} />
                    <Grid container spacing={2} alignItems="center" justify="center">
                    {publicContent?.data?.data?.map((data,index)=>(
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


        </div>
    );
}

export default PublicContent;
