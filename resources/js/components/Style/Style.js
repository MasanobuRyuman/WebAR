import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link ,withRouter} from 'react-router-dom';
import {Input, Box,MenuItem,InputLabel,FormControl,Grid,Typography,Button,TextField,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText,Select} from '@mui/material';
import { styled } from '@mui/system';

export default function Style(){
    const TextByIntroducitonPage = styled('Typography')({
        fontSize: 20,
        display:"block",
    })

    const TextFiledByIntroductionPage = styled('TextField')({
        width:20,
    })
}
