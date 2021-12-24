import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input,Box,MenuItem,InputLabel,FormControl,TextField} from '@mui/material';
import TagSearchInput from './TagSearchInput.js';
export default function SearchTypeButton(props){
    const [searchType, setSearchType] = useState("");
    const [selectTag, setSelectTag] = useState("");
    function InputType(){
        console.log("inputType")
        console.log(selectTag)
        console.log(props.tagList)
        if(searchType == "タグ"){
            return <TagSearchInput tagList={props.tagList} />;
        }else{
            return <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
        }
    }
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
        localStorage.setItem("searchType",searchType);
    }
    return(
        <div>
            <Box sx={{ minWidth: 100 }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">検索選択</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchType}
                        label="serchType"
                        onChange={searchInput}
                    >
                        <MenuItem value={"タグ"}>タグ</MenuItem>
                        <MenuItem value={"コンテンツ名"}>コンテンツ名</MenuItem>
                        <MenuItem value={"ユーザー名"}>ユーザー名</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <InputType />
            <Link to='./publicSearchPage' onClick={searchData}>検索</Link>
        </div>
    )
}
