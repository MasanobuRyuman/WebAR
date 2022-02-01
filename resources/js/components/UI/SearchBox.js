import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input,Box,MenuItem,InputLabel,FormControl,TextField,Button} from '@mui/material';
import TagSearchInput from './TagSearchInput.js';
import SearchTypeButton from './SearchTypeButton.js';
export default function SearchBox(props){
    const [searchType, setSearchType] = useState("タグ");
    const [selectTag, setSelectTag] = useState("default");
    const [selectedTagList, setSelectedTagList] = React.useState([]);
    function tagInput(e){
        console.log("tagInput");
        console.log(e.target.Value);
        setSelectTag(e.target.Value);
    }
    function addTagData(data){
        console.log("addTagData");
        console.log(data);
        setSelectTag(data);
    }
    function searchInput(e){
        console.log(e.target.value);
        console.log("kita");
        setSearchType(e.target.value);
    }
    function searchData(){
        console.log("searchData");
        console.log(searchType);
        console.log(selectedTagList);
        localStorage.setItem("searchType",searchType);
        let searchValue = "";
        if (searchType == "タグ"){
            console.log("searchDataのタグに入った");
            localStorage.setItem("selectedTagList",JSON.stringify(selectedTagList));
            searchValue = selectedTagList;
        }else{
            let searchCharacter = document.getElementById("searchCharacter").value;
            localStorage.setItem("searchCharacter",searchCharacter);
            searchValue = searchCharacter;
        }

        if (props.setSearchValue != undefined){
            props.setSearchValue(searchValue);
        }
    }
    function InputType(){
        console.log("inputType")
        console.log(selectTag)
        console.log(props.tagList)
        if(searchType == "タグ"){
            return <TagSearchInput tagList={props.tagList} selectedTag={selectedTagList} setSelectedTag={setSelectedTagList} sx={{
                width:300,
            }}/>;
        }else{
            return <TextField id="searchCharacter" label="Outlined" variant="outlined" sx={{
                width:300,
            }} />;
        }
    }
    function SearchButton(){
        if(props.pageSource == "publicContent"){
            return(
                <Link to='./publicSearchPage' onClick={searchData}><Button variant="outlined" size="large" sx={{
                    height     :55,
                    borderColor:"grey.500",
                    color      :"black",
                }}>検索</Button></Link>
            )
        }
    }
    return(
        <div>
            <Box key="serchFunction" sx={{
                width         : 1,
                display       : 'flex',
                justifyContent: "center",
                alignItems    : "center",
                mt            :5,
            }}>
                <SearchTypeButton pageSource={props.pageSource} searchType={searchType} searchInput={searchInput}/>
                <InputType />
                <SearchButton />
            </Box>
        </div>
    )
}
