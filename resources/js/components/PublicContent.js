import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SearchBox from './UI/searchBox.js';
import Header from './UI/Header.js';
import ContentCatalog from './UI/ContentCatalog.js';

function PublicContent() {
    const [publicContent,setUserContent] = useState(["temp"]);
    const [nowPage,setNowPage] = useState(1);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [csrfToken,setCsrfToken] = useState("");
    const [searchBasedTagData,setSelectTagData] = useState([]);
    const [tagDataList,setTagDataList] = useState([]);
    const [searchType,setSearchType] = useState('');
    const temp = "temp";

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
        console.log(options);
    }

    useEffect(() => {
        getUsers();
    },[nowPage]);


    const getUsers = async () => {
        const response = await axios.get(`/api/publicContentAPI?page=${nowPage}`);
        console.log(response);
        setUserContent(response);
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

    return (
        <div>
            <Header />
            <SearchBox tagList={tagDataList} pageSource="publicContent"/>
            <ContentCatalog contentData={publicContent} nowPage={nowPage} setNowPage={setNowPage} />
        </div>
    )
}

export default PublicContent;
