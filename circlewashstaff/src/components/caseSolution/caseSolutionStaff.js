import React, {useState}from 'react';
import { Container, CssBaseline, Typography, Box, Grid, Select, MenuItem, InputLabel, TextField, Button} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function CaseSolutionStaff({fileCase}){
    const [solutionType, setSolutionType] = useState();
    const [amount, setAmount] = useState();
    const [refundType, setRefundType] = useState();
    const navigate = useNavigate();

    const handleCompleteClick = () =>{
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5000/solution',
            data: {
                solutionType: solutionType,
                amount: null,
                refundType: null,
                approve: true,
                status: 'Handled',
                fileCase: fileCase
            }
        })
        .then((res) => {
            console.log(res.data)
            navigate('/case')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleRequestClick = () =>{
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5000/solution',
            data: {
                solutionType: solutionType,
                amount: amount,
                refundType: refundType,
                approve: false,
                status: 'Pending',
                fileCase: fileCase,
            }
        })
        .then((res) => {
            console.log(res.data)
            navigate('/case')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <Container maxWidth='xs' sx={{pt:3}}>
            <CssBaseline />
            <Box>
                <Typography sx={{fontWeight: 700, fontSize: 25}}>
                    Create Case Solution
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{mt:3}}>
                <Grid item sm={12} >
                    <InputLabel>Solution Type</InputLabel>
                    <Select
                        fullWidth
                        value={solutionType}
                        onChange={(e) => setSolutionType(e.target.value)}
                    >
                        <MenuItem value={'Complaint resolved with no refund'}>Complaint resolved with no refund</MenuItem>
                        <MenuItem value={'Complaint denied'}>Complaint denied</MenuItem>
                        <MenuItem value={'Complaint addressed and require refund'}>Complaint addressed and require refund</MenuItem>
                    </Select>
                </Grid>
                {(solutionType) && ((solutionType === 'Complaint addressed and require refund') &&
                (<React.Fragment>
                    <Grid item sm={12} >
                        <InputLabel>Amount</InputLabel>
                        <TextField
                            fullWidth
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            />
                    </Grid>
                    <Grid item sm={12} >
                        <InputLabel>Refund Type</InputLabel>
                        <Select
                            fullWidth
                            value={refundType}
                            onChange={(e) => setRefundType(e.target.value)}
                        >
                            <MenuItem value={'Cash'}>Cash</MenuItem>
                            <MenuItem value={'FasCard Credit'}>FasCard Credit</MenuItem>
                            <MenuItem value={'FasCard Credit with FasCard'}>FasCard Credit with FasCard</MenuItem>
                        </Select>
                    </Grid>
                </React.Fragment>))}
            </Grid>
            {(solutionType) && ((solutionType === 'Complaint addressed and require refund') ? (
                <Box sx={{display: 'flex', flexDirection: 'row-reverse', mt:3}}>
                    <Button
                        onClick={() => {handleRequestClick()}}
                        variant="contained">
                        Request Approval
                    </Button>
                </Box>
            ) : (
                <Box sx={{display: 'flex', flexDirection: 'row-reverse', mt:3}}>
                    <Button
                        onClick={() => {handleCompleteClick()}}
                        variant="contained">
                        Complete Case
                    </Button>
                </Box>
                ))} 
        </Container>
    )
}