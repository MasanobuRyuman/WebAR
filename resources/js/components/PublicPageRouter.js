import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import PublicContent from './PublicContent.js';
import LoginPage from './LoginPage.js';
import PublicSearchPage from './PublicSearchPage.js';

export default function PublicPageRouter() {
    function HomePage(){
        return <h1>homePage</h1>
    }
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <PublicContent />
                </Route>
                <Route path="/LoginPage">
                    <LoginPage />
                </Route>
                <Route path="/publicSearchPage">
                    <PublicSearchPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}


if (document.getElementById('PublicContent')) {
    console.log("publicRouter");
    ReactDOM.render(<PublicPageRouter />, document.getElementById('PublicContent'));
}
