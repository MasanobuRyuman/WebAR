import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button} from '@mui/material';

export default function LoginHeader(){
    return(
        <Box sx={{
            display        : 'flex',
            backgroundColor: "#81c784",
        }}>
            <Typography variant="h2" sx={{
                fontSize:40,
                display : 'inline',
                m       : 'auto',
            }}>ARShare</Typography>
            <Typography sx={{
                fontSize:20,
                m       :2,
            }}>初めての人</Typography>
            <a href="/"><Button sx={{
                fontSize:20,
                m       :2,
            }}>トップページに戻る</Button></a>
        </Box>
    )
}
