import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';


function LoginPage() {
    const [csrfToken,setCsrfToken] = useState("");
    function getCsrf(){
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
    }

    return(
        <div>
            <form method="POST" action="/signUp">
                <input type="hidden" name="_token" value={csrfToken} />
                <p>名前</p>
                <input name="name" />
                <p>パスワード</p>
                <input name="password" />
                <input type="submit" name="login" value="ログイン" onClick={getCsrf} />
                <input type="submit" name="newLogin" value="新規登録" onClick={getCsrf} />
            </form>
        </div>
    )
}
export default LoginPage;
