import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl} from '@mui/material';
import SearchTypeButton from './UI/searchTypeButton.js';


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

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(()=>{
        getTagList();
    },[])

    const options = []
    const getTagList = async ()=>{
        const res = await axios.get('/api/getTagAPI');
        console.log(res.data);
        res.data.forEach(e => {
            console.log(e.tagName);
            options.push(e.tagName);
        })
        setTagDataList(options);
        console.log(options);
    }

    useEffect(() => {
        getUsers();
    },[nowPage]);

    useEffect(()=>{
        if (firstUseEffect == true){
            console.log("kita");
            setFirstUseEffect(false);
        }else{
            buttonSet();
        }
    },[publicContent]);
    const getUsers = async () => {
        const response = await axios.get(`/api/publicContentAPI?page=${nowPage}`);
        setUserContent(response);
        console.log("中身表示");
        console.log(response);
        console.log(response.data.last_page);
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
        let prev = true;
        let outputPage = nowPage;
        let list = [nowPage];
        let pageCount = 0;
        let addprevpage = publicContent.data.last_page - outputPage;
        console.log("pageCount");
        while (true){
            console.log(outputPage);
            if (outputPage == 1){
                prev = false;
                outputPage = nowPage;
            } else if(prev == true && pageCount == 5 + (5-addprevpage)){
                prev = false;
                outputPage = nowPage;
            }

            if (prev == true){
                console.log("prevTrue");
                outputPage -= 1;
                pageCount += 1;
                list.unshift(outputPage);
            }else if (outputPage == publicContent.data.last_page){
                break;
            }else if (pageCount == 10){
                break;
            }else{
                outputPage += 1;
                pageCount += 1;
                console.log("add");
                list.push(outputPage);
            }
        }
        setPaging(list)
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
            console.log(i.value);
            tagList.push(i.value);
        });
        setSelectTagData(tagList);
    }

    function setSearchBasedTag(){
        console.log("searchbased");
        console.log(searchBasedTagData);
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

    function searchInput(e){
        console.log(e);
    }

    return (
        <div>
            <h1>Publicペ-ジ</h1>
            <Link to={'./LoginPage'}>ログイン</Link>
            <p>検索</p>
            <SearchTypeButton tagList={tagDataList} />
            <Link to={'./publicSearchPage'} onClick={setSearchBasedTag}>検索</Link>
            <input id="searchName" />
            <Link to={'./publicSearchNamePage'} onClick={setSearchBasedName}>検索</Link>
            <form method="POST" action="/AR">
                <input type="hidden" name="_token" value={csrfToken} />
                {publicContent?.data?.data?.map((data,index)=>(
                    <div key={index}>
                        <p>{data.name}</p>
                        <p>{data.contentName}</p>
                        <input type="submit" onClick={() => arLink(data.name,data.saveName)} value="AR"></input>
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
