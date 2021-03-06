import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';

export default function PageButton(nowPage,lastPage){
    let prev = true;
    let outputPage = nowPage;
    let list = [nowPage];
    let pageCount = 0;
    let deistanceEnd = lastPage - outputPage;
    let addPrev = 0
    if (deistanceEnd >= 5){
        addPrev = 5
    }else{
        addPrev = deistanceEnd
    }
    console.log(addPrev);
    console.log("pageCount");
    while (true){
        console.log(outputPage);
        if (outputPage == 1){
            prev = false;
            outputPage = nowPage;
        } else if(prev == true && pageCount == 5 + (5-addPrev)){
            console.log("5以上前に行った");
            prev = false;
            outputPage = nowPage;
        }

        if (prev == true){
            console.log("prevTrue");
            outputPage -= 1;
            pageCount += 1;
            list.unshift(outputPage);
        }else if (outputPage == lastPage){
            break;
        }else if (pageCount >= 10){
            break;
        }else{
            outputPage += 1;
            pageCount += 1;
            console.log("add");
            console.log(pageCount);
            list.push(outputPage);
        }
    }
    return list;
}
