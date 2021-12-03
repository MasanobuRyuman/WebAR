import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';

export default function UserContentIntroduction() {
    console.log('userContentIntroduction');
    let saveName = document.getElementById("saveNameKeep").value;
    
    return(
        <div>
            <h1>紹介ページ</h1>
            <p>説明</p>
            <input />
            <input type="submit" value="AR" />
        </div>
    )
}
