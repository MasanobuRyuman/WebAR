import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';

export default function PageButton(nowPage,lastPage){

    let prev = true;
    let outputPage = nowPage;
    let list = [nowPage];
    let pageCount = 0;
    let addprevpage = lastPage - outputPage;
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
