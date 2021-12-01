import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import UserContent from './UserContent.js';
import AddFile from './AddFile.js';
import UserContentEdit from './UserContentEdit.js';
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
            </Switch>
        </BrowserRouter>
    )
}

if (document.getElementById('mainPage2')) {
    console.log("userRouter");
    ReactDOM.render(<UserRouter />, document.getElementById('mainPage2'));
}
