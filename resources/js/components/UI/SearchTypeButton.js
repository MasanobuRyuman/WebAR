import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input,Box,MenuItem,InputLabel,FormControl,TextField,Button} from '@mui/material';
import TagSearchInput from './TagSearchInput.js';
export default function SearchTypeButton(props){
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
        if (searchType == "タグ"){
            console.log("searchDataのタグに入った");
            localStorage.setItem("selectedTagList",JSON.stringify(selectedTagList));
        }else{
            let searchCharacter = document.getElementById("searchCharacter").value;
            localStorage.setItem("searchCharacter",searchCharacter);
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
    return(
        <div>
            <Box key="serchFunction" sx={{
                width   : 1,
                display : 'flex',
                justifyContent: "center",
                alignItems: "center",
                mt:5,
            }}>
                <FormControl sx={{
                    width:150,

                }}>
                    <InputLabel id="demo-simple-select-label">検索選択</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue = 'タグ'
                        value={searchType}
                        label="serchType"
                        onChange={searchInput}
                    >
                        <MenuItem value={"タグ"}>タグ</MenuItem>
                        <MenuItem value={"コンテンツ名"}>コンテンツ名</MenuItem>
                        <MenuItem value={"ユーザー名"}>ユーザー名</MenuItem>
                    </Select>
                </FormControl>
                <InputType />
                <Link to='./publicSearchPage' onClick={searchData}><Button variant="outlined" size="large" sx={{
                    height:55,
                    borderColor:"grey.500",
                    color:"black",
                }}>検索</Button></Link>
            </Box>
        </div>
    )
}
