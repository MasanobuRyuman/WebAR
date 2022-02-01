import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link } from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';

function LoginPage() {
    const [csrfToken,setCsrfToken] = useState("");
    function getCsrf(){
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        setCsrfToken(csrf_token);
    }

    return(
        <Box>
            <Box sx={{
                mt:20,
                mr:20,
                ml:20,
                border:1,
                height:400,
            }}>
                <form method="POST" action="/signUp">
                    <Input type="hidden" name="_token" value={csrfToken} />
                    <Typography sx={{
                        ml:10,
                    }}>名前</Typography>
                    <Input name="name" sx={{
                        display:"block",
                        mr     :10,
                        ml     :10,
                    }}/>
                    <Typography sx={{
                        mt:10,
                        ml:10,
                    }}>パスワード</Typography>
                    <Input name="password" sx={{
                        display:"block",
                        mr     :10,
                        ml     :10,
                    }}/>
                    <Grid container spacing={2} alignItems="center" justify="center" sx={{
                        mt:10,
                    }}>
                        <Input type="submit" name="login" value="ログイン" onClick={getCsrf} sx={{
                            m:"auto",
                        }}/>
                        <Input type="submit" name="newLogin" value="新規登録" onClick={getCsrf} sx={{
                            m:"auto",
                        }}/>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}
export default LoginPage;
