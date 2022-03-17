import React, {useState} from 'react';
import Footer from '../footer/footer';
import Box from '@mui/material/Box';
import Report from './report';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Button, Divider} from '@mui/material';
import ContactInfo from './contactInfo';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function Support(){

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [reportInfo, setReportInfo] = useState({
        machineType: '',
        machineNo: '',
        date: new Date(),
        amount: '',
        description: '',
        payType: '',
        fasCardNum: '',
        creditCardNum: '',
    })

    const useStyles = makeStyles({
        root: {
            background: '#EFF1F2',
        },
    });

    const classes = useStyles();
    let navigate = useNavigate();

    const handleSubmit = () => {
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5000/reportFiles/add',
            data: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phone: userInfo.phone,
                machineType: reportInfo.machineType,
                machineNo: reportInfo.machineNo,
                date: reportInfo.date,
                amount: reportInfo.amount,
                description: reportInfo.description,
                status: false,
                payType: reportInfo.payType,
                fasCardNum: reportInfo.fasCardNum,
                creditCardNum: reportInfo.creditCardNum,        
            }
        })
        .then((res) => {
            console.log(res);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleReturnHome = () => {  
        navigate('/');
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component='div' maxWidth='lg' sx={{}}>
                <Typography sx={{fontWeight: 700, fontSize: 40, pt: 5}}>
                    Out of Service Form
                </Typography>
                <Typography variant='body2'>
                    Sorry, Please let us know by entering your details below
                </Typography>
                <Divider sx={{mt: 5, mb: 5}}/>
                <ContactInfo userInfo={userInfo} setUserInfo={setUserInfo}/>
                <Report reportInfo={reportInfo} setReportInfo={setReportInfo} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="text" onClick={handleReturnHome}>
                        Return Home
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} >
                        Submit
                    </Button>
                </Box>
            </Container>
            <Footer/ >
        </div>
    );
}