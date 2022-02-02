import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import UserContent from './UserContent.js';
import AddFile from './AddFile.js';
import UserContentEdit from './UserContentEdit.js';
import UserContentIntroduction from './UserContentIntroduction.js';
import EditPhoto from './EditPhoto.js';
import UserSearchPage from './UserSearchPage.js';

export default function UserRouter() {
    function HomePage(){
        return <h1>homePage</h1>
    }
    console.log("きている");
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/main">
                    <UserContent />
                </Route>
                <Route path="/AddFile">
                    <AddFile />
                </Route>
                <Route path="/UserContentEdit">
                    <UserContentEdit />
                </Route>
                <Route path="/userContentIntroduction">
                    <UserContentIntroduction />
                </Route>
                <Route path="/EditPhoto">
                    <EditPhoto />
                </Route>
                <Route path="/UserSearchPage">
                    <UserSearchPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

if (document.getElementById('mainPage2')) {
    console.log("userRouter");
    ReactDOM.render(<UserRouter />, document.getElementById('mainPage2'));
}
