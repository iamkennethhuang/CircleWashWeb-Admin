import { Typography, Box, CssBaseline, Container, Toolbar, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react';
import NavBar from '../navbar/index';
import localstorageService from '../../services/localstorageService';
import {useNavigate} from "react-router-dom";
import CustomPie from './customPie';
import axios from 'axios';

export default function MachineStat(){
    const [loggedIn, setLoggedIn] = useState();
    const [allPieData, setAllPieData] = useState();
    const navigate = useNavigate();
    const apiOptionMonth = {month: 'long'};

    useEffect(() => {
        const value = localstorageService.getLogInWithExpiry('login');
        if(value === true){
            setLoggedIn(true);
        }
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/fascard/pie/month/all',
        })
        .then((res) => {  
            console.log('finish updating');
            setAllPieData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    if(loggedIn === false){
        navigate('/signin');
    }
    
    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <NavBar/>
            <Container maxWidth='false' sx={{pt: 2}}>
                <Toolbar />
                <Typography sx={{fontSize: 30, fontWeight: 700, mb:4}}>
                    Machine Statistic for {new Date().toLocaleDateString("en-US", apiOptionMonth)}
                </Typography>
                <Grid container spacing={2} sx={{height: '10%'}}>    
                    {(allPieData) && (
                        allPieData.map(data => (
                            <Grid item xs={3} sx={{height: '50%'}}>
                                <Box 
                                    sx={{
                                    background:'#EFF1F2',
                                    height: '100%',
                                    pt: 2,
                                    pl: 2}}>
                                    <Typography sx={{mb:1}}>
                                        Machine #{data.machineNumber} Status
                                    </Typography>
                                    <CustomPie data={data.pieData} />
                                </Box>
                            </ Grid>
                        ))
                    )}
                </Grid>
            </Container>  
        </Box>
    );
}