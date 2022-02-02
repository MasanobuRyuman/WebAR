import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography} from '@mui/material';

export default function SearchTypeButton(props){
    if(props.pageSource == "publicContent"){
        return(
            <FormControl sx={{
                width:150,
            }}>
                <InputLabel id="demo-simple-select-label">検索選択</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue = 'タグ'
                    value={props.searchType}
                    label="serchType"
                    onChange={props.searchInput}
                >
                    <MenuItem value={"タグ"}>タグ</MenuItem>
                    <MenuItem value={"コンテンツ名"}>コンテンツ名</MenuItem>
                    <MenuItem value={"ユーザー名"}>ユーザー名</MenuItem>
                </Select>
            </FormControl>
        )
    }else if(props.pageSource == "userContent"){
        return(
            <FormControl sx={{
                width:150,
            }}>
                <InputLabel id="demo-simple-select-label">検索選択</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue = 'タグ'
                    value={props.searchType}
                    label="serchType"
                    onChange={props.searchInput}
                >
                    <MenuItem value={"タグ"}>タグ</MenuItem>
                    <MenuItem value={"コンテンツ名"}>コンテンツ名</MenuItem>
                </Select>
            </FormControl>
        )
    }
}
