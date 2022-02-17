import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Select,Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography} from '@mui/material';

export default function Header(){
    return(
        <Box sx={{
            display        : 'flex',
            backgroundColor: "black",
        }}>
            <Typography variant="h2" sx={{
                fontSize: 40,
                display : 'inline',
                m       : 'auto',
                color   : 'white',
            }}>ARShare</Typography>
            <Typography sx={{
                fontSize: 20,
                m       : 2,
                color   : 'white',
            }}>初めての人</Typography>
            <Link to={'./LoginPage'}><Typography sx={{
                fontSize: 20,
                m       : 2,
                color   : 'white',
            }}>ログイン</Typography></Link>
        </Box>
    )
}
