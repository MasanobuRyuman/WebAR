import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import UserContent from './UserContent.js';
import AddFile from './AddFile.js';
export default function UserRouter() {
    function HomePage(){
        return <h1>homePage</h1>
    }
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/main">
                    <UserContent />
                </Route>
                <Route path="/AddFile">
                    <AddFile />
                </Route>
                <Route path="/hone">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}


if (document.getElementById('mainPage2')) {
    console.log("userRouter");
    ReactDOM.render(<UserRouter />, document.getElementById('mainPage2'));
}
