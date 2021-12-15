import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import PageButton from './PageButton.js';

export default function PublicSerchPage() {
    const [searchContent, setsearchContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [first,setFirst] = useState(true);
    useEffect(()=>{
        getContent()
    },[])
    useEffect(()=>{
        if (first == true){
            console.log("fast");
            setFirst(false);
        }else{
            setPageButton()
            console.log("second");
        }
    },[searchContent])
    const getContent = async ()=>{
        let searchBasedTagList = localStorage.getItem("searchBasedTag");
        searchBasedTagList = JSON.parse(searchBasedTagList);

        console.log(searchBasedTagList);
        let formData = new FormData();
        searchBasedTagList.forEach(i=>{
            formData.append("searchBasedTagList[]",i.tagName);
        })

        let request = await axios.post(`./api/getSearchContentAPI?page=${nowPage}`,formData);
        console.log(request.data.last_page);
        setsearchContent(request);
    }
    function setPageButton(){
        let lastPage = searchContent.data.last_page;
        console.log("pageButton");
        console.log(nowPage);
        console.log(lastPage);
        console.log(PageButton(nowPage,lastPage));
        setPaging(PageButton(nowPage,lastPage));
    }
    function move_page(pageNumber){
        setNowPage(pageNumber);
    }
    return(
        <div>
            <h1>検索画面</h1>
            <Link to='/'>戻る</Link>
            {searchContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.name}</p>
                    <p>{data.contentName}</p>
                    <input type="submit" onClick={() => arLink(data.name,data.saveName)} value="AR"></input>
                </div>
            ))}
            {paging.map((data)=>(
                <a key={data} onClick={() => move_page(data)}>{data}</a>
            ))}
        </div>
    )
}
