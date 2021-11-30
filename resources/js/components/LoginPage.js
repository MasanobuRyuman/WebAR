import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';


function LoginPage() {

    return(
        <div>
            <p>名前</p>
            <input name="name" />
            <p>パスワード</p>
            <input name="password" />
            <input type="submit" name="login" value="ログイン" />
            <input type="submit" name="newLogin" value="新規登録" />
        </div>
    )
}
export default withRouter(LoginPage);
