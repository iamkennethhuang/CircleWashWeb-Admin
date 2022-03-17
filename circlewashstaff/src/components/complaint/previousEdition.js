import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Container, Typography, Grid, Button} from '@mui/material';
import axios from 'axios';
import { CssBaseline } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function Complaint ({file}){
    let params = useParams()
    const[complaint, setComplaint] = useState();
    // const[next, setNext] = useState();
    // const[previous, setPrevious] = useState();
    const navigate = useNavigate();


    // const handleUnsolveClick = () => {
    //     axios({
    //         method: 'put',
    //         withCredentials: true,
    //         url: `http://localhost:5000/reportFiles/updatestatus`,
    //         data: {
    //             fileId: id,
    //             status: false,
    //         }
    //     })
    //     .then(function (res){ 
    //         console.log(res.data);
    //         navigate('/');
    //     })
    //     .catch((err) => console.log(err));
    // }

    // const handleSolveClick = () => {
    //     axios({
    //         method: 'put',
    //         withCredentials: true,
    //         url: `http://localhost:5000/reportFiles/updatestatus`,
    //         data: {
    //             fileId: id,
    //             status: true,
    //         }
    //     })
    //     .then(function (res){ 
    //         console.log(res.data);
    //         navigate('/');
    //         window.location.reload();
    //     })
    //     .catch((err) => console.log(err));
    // }

    useEffect(() => {
        setComplaint(file);
        // axios({
        //     method: 'get',
        //     withCredentials: true,
        //     url: `http://localhost:5000/reportFiles/${id}`,
        // })
        // .then(function (res){ 
        //     setComplaint(res.data);
        // })
        // .catch((err) => console.log(err));
        // axios({
        //     method: 'get',
        //     withCredentials: true,
        //     url: `http://localhost:5000/reportFiles/next`,
        //     params: {
        //         fileId: id
        //     }
        // })
        // .then((res) => {
        //     (res.data !== 'no') && setNext((res.data));
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
        // axios({
        //     method: 'get',
        //     withCredentials: true,
        //     url: `http://localhost:5000/reportFiles/previous`,
        //     params: {
        //         fileId: id
        //     }
        // })
        // .then((res) => {
        //     (res.data !== 'no') && setPrevious((res.data));
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    }, [])

    const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};

    // const handleNextClick = () => {
    //     navigate(`/complaint/${next}`);
    //     window.location.reload();
    // }

    // const handlePreviousClick = () => {
    //     navigate(`/complaint/${previous}`);
    //     window.location.reload();
    // }
    
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />           
            <Container maxWidth='false' sx={{background:'#EFF1F2'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt:1, mb: 5}}>
                    <Typography sx={{fontWeight: 600, fontSize: 30}}>
                        Complaint #{file._id}
                    </Typography>
                    {/* {(complaint) && ((complaint.status === false) ? (
                        <Button variant="contained" size="medium" color="success" onClick={handleSolveClick}>
                            Solve
                        </Button>
                    ) : (
                        <Button variant="outlined" size="medium" color="error" onClick={handleUnsolveClick}>
                            Unsolve
                        </Button>
                    ))} */}
                </Box>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={5} sx={{mb:3}}>
                        <Grid container direction='column' spacing={4}>
                            <Grid item xs={12}>
                                <Box sx={{
                                    background:'#FFFFFF',
                                    pt: 3,
                                    pl: 5,
                                    pb: 5,
                                    pr: 5
                                    }}>
                                    <Typography sx={{fontWeight: 700, fontSize: 25, mb: 5}}>
                                        Customer Information 
                                    </Typography>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Name: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.firstName} {complaint.lastName}
                                        </Typography>}      
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Phone: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.phone}
                                        </Typography>}      
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between',}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Email: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.email}
                                        </Typography>}      
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{
                                    background:'#FFFFFF',
                                    pt: 3,
                                    pl: 5,
                                    pb: 5,
                                    pr: 5
                                    }}>
                                    <Typography sx={{fontWeight: 700, fontSize: 25, mb: 5}}>
                                        Complaint Detail
                                    </Typography>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Machine Type:
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.machineType}
                                        </Typography>}      
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Machine No.: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.machineNo}
                                        </Typography>}      
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Amount: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.amount} usd
                                        </Typography>}      
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Payment method: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.payType} 
                                        </Typography>}      
                                    </Box>
                                    {(complaint) && ((complaint.payType === 'FasCard') && 
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            FasCard Number: 
                                        </Typography>
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.fasCardNum} 
                                        </Typography>   
                                    </Box>)}
                                    {(complaint) && ((complaint.payType === 'CreditCard') && 
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Credit/Debit Card (last 4 digits): 
                                        </Typography>
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.creditCardNum} 
                                        </Typography>     
                                    </Box>)}
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Date: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {new Date(complaint.date).toLocaleDateString("en-US", options)} 
                                        </Typography>}      
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between',}}>   
                                        <Typography sx={{fontWeight: 500, fontSize: 20, mr: 1}}>
                                            Details: 
                                        </Typography>
                                        {(complaint) && 
                                        <Typography sx={{fontWeight: 300, fontSize: 20}}>
                                            {complaint.description} 
                                        </Typography>}      
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Box sx={{display: 'flex',
                    justifyContent: 'space-between',
                    pb: 3}}>
                    <Button disabled={(previous === undefined)} variant="contained" size="medium" onClick={handlePreviousClick} sx={{background: '#F3AA50'}}>
                        Previos
                    </Button>
                    <Button disabled={(next === undefined)} variant="contained" size="medium" onClick={handleNextClick} sx={{background: '#66B98B'}}>
                        Next
                    </Button>
                </Box> */}
            </Container>
        </Box>
    );
}