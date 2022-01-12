import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl} from '@mui/material';
import SearchTypeButton from './UI/searchTypeButton.js';
import PageButton from './UI/PageButton.js';

function PublicContent() {
    const [publicContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [userName,setUserName] = useState("");
    const [saveName,setSaveName] = useState("");
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
        console.log(response);
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
        console.log("lastPage");
        console.log(lastPage);
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



    function addLocalStorageData(saveName){
        localStorage.setItem('saveName', saveName);
        setSaveName(saveName);
    }

    return (
        <div>
            <h1>Publicペ-ジ</h1>
            <Link to={'./LoginPage'}>ログイン</Link>
            <p>検索</p>
            <SearchTypeButton tagList={tagDataList} />
            <form method="GET" action={`ContentIntroduction/${saveName}`}>
                <input type="hidden" name="_token" value={csrfToken} />
                {publicContent?.data?.data?.map((data,index)=>(
                    <div key={index}>
                        <p>{data.name}</p>
                        <p>{data.contentName}</p>
                        <input type="submit" onClick={() => addLocalStorageData(data.saveName)} value="作品ページ" />
                    </div>
                ))}
                <a onClick={prev_current_page}>前</a>
                {paging.map((data)=>(
                    <a key={data} onClick={() => move_page(data)}>{data}</a>
                ))}
                <a onClick={add_current_page}>次</a>
                <input type="hidden" value={userName}></input>
                <input type="hidden" name="saveName" value={saveName}></input>
            </form>
        </div>
    );
}

export default PublicContent;
