import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import UserContent from './UserContent.js';

function AddFile() {
    return(
        <div>
            <h1>ファイル追加</h1>


            
        </div>
    )
}
export default withRouter(AddFile);
