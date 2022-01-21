import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography} from '@mui/material';

export default function Header(){
    return(
        <Box sx={{
            display: 'flex',
            backgroundColor: "#81c784",
        }}>
            <Typography variant="h2" sx={{
                fontSize:40,
                display: 'inline',
                m: 'auto',
            }}>ARShare</Typography>
            <Typography sx={{
                fontSize:20,
            }}>初めての人</Typography>
            <Typography sx={{
                fontSize:20,
            }}><Link to={'./LoginPage'}>ログイン</Link></Typography>
        </Box>
    )
}
