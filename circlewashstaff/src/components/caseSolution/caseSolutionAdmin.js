import React, {useState}from 'react';
import { Container, CssBaseline, Typography, Box, Grid, Select, MenuItem, InputLabel, TextField, Button} from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CasePendingRefund from './casePendingRefund';

export default function CaseSolutionAdmin({fileCase}){
    const [solutionType, setSolutionType] = useState();
    const [amount, setAmount] = useState(null);
    const [refundType, setRefundType] = useState(null);
    const navigate = useNavigate();

    const handleCompleteClick = () =>{
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5000/solution',
            data: {
                solutionType: solutionType,
                amount: amount,
                refundType: refundType,
                approve: true,
                status: 'Handled',
                fileCase: fileCase
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('/case');
            window.location.reloard();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <Container maxWidth='lg' sx={{pt:3}}>
            <CssBaseline />
            <Box>
                <Typography sx={{fontWeight: 700, fontSize: 25}}>
                    Manage Case Solution 
                </Typography>
            </Box>
            <Grid container spacing={4} sx={{mt:3}}>
                <Grid item sm={12} md={6} >
                    <Box  width="100%"  sx={{background: '#D4EFF9', pt:2, pl:2, pb:2, pr: 2}}>
                        <Typography sx={{fontWeight: 600, fontSize: 20}}>
                            Pending Solution
                        </Typography>
                        <CasePendingRefund fileCase={fileCase}/>
                    </Box>
                </Grid>
                <Grid item sm={12} md={6} container spacing={2} >
                    <Box width="100%" sx={{ pt:3.5, pl:2, pb:2, pr: 2}}>
                        <Typography sx={{fontWeight: 600, fontSize: 20}}>
                            Create a new Solution
                        </Typography>
                        <Grid item sm={12} >
                            <InputLabel sx={{mt:3}}>Solution Type</InputLabel>
                            <Select
                                fullWidth
                                value={solutionType}
                                onChange={(e) => setSolutionType(e.target.value)}
                            >
                                <MenuItem value={'Complaint resolved with no refund'}>Complaint resolved with no refund</MenuItem>
                                <MenuItem value={'Complaint denied'}>Complaint denied</MenuItem>
                                <MenuItem value={'Complaint addressed with cash refund'}>Complaint addressed with cash refund</MenuItem>
                                <MenuItem value={'Complaint addressed with FasCard credit refund'}>Complaint addressed with FasCard credit refund</MenuItem>
                                <MenuItem value={'Complaint addressed with FasCard card and credit refund'}>Complaint addressed with FasCard card and credit refund</MenuItem>
                            </Select>
                        </Grid>
                        {(solutionType) && ((solutionType !== 'Complaint resolved with no refund' && solutionType !== 'Complaint denied') &&
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
                        <Box width="100%" sx={{mt:3, display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                sx={{}}
                                onClick={() => {handleCompleteClick()}}
                                variant="contained">
                                Complete Case
                            </Button>
                        </Box>
                    </Box> 
                </Grid>
            </Grid>
        </Container>
    )
}

// display: 'flex', flexDirection: 'row-reverse',