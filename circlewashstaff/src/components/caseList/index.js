import React, {useState, useEffect} from 'react';
import NavBar from '../navbar/index';
import { Box, CssBaseline, Container, Toolbar, Typography, TextField, Button, Select, MenuItem, Paper, TableContainer, TableHead, TableRow, TableCell, Table, TableBody} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import localstorageService from '../../services/localstorageService';

export default function CaseList(){
    const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};
    const[caseType, setCaseType] = useState('Unhandle');
    const[allUnhandle, setAllUnhandle] = useState([]);
    const[allPending, setAllPending] = useState([]);
    const[allHandled, setAllHandled] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const value = localstorageService.getLogInWithExpiry('login');
        if(value === true){
            setLoggedIn(true);
        }
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/filecase/all',
            params: {
                status: 'Unhandle'
            }
        })
        .then((res) => {
            setAllUnhandle(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/filecase/all',
            params: {
                status: 'Pending'
            }
        })
        .then((res) => {
            setAllPending(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/filecase/all',
            params: {
                status: 'Handled'
            }
        })
        .then((res) => {
            setAllHandled(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    
    console.log(allHandled);

    const handleRowClick = (caseId) => {
        navigate(`/case/dashboard/0/${caseId}`);
    }

    const handleSelectClick = (e) => { 
        setCaseType(e.target.value);
    }

    if(loggedIn === false){
        navigate('/signin');
    }

    return(
        <Box sx={{display: 'flex', pt: 5, pl: 4}}>
            <CssBaseline />
            <NavBar/>
            <Container maxWidth='false'>
                <Toolbar />
                <Typography sx={{fontWeight: 700, fontSize: 30, mb:5}}>
                    Cases
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb:5 }}>
                    <Select
                        size="small"
                        onChange={(e) => {handleSelectClick(e)}}
                        value={caseType}>
                        <MenuItem value={'Unhandle'}>Unhandle</MenuItem>
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Handled'}>Handled</MenuItem>
                    </Select>
                    <Box sx={{display: 'flex'}}>
                        <TextField
                            label="Search"
                            id="outlined-size-small"
                            size="small"
                        />
                        <Button variant="contained" sx={{background: '#5F95FF', ml: 1}}>Search</Button>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell align="left">Machine Type</TableCell>
                                <TableCell align="left">Refund Status</TableCell>
                                <TableCell align="left">Requester</TableCell>
                                <TableCell align="left">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(caseType === 'Unhandle') &&
                            ((allUnhandle.length > 0) && (
                                allUnhandle.map((c) => {
                                    return (
                                        <TableRow
                                            key={c._id} 
                                            onClick={() => handleRowClick(c._id)}
                                            hover>
                                            <TableCell align='left'>{c.reportFile.machineType}</TableCell>
                                            <TableCell align='left'>{c.status}</TableCell>
                                            <TableCell align="left">{c.reportFile.firstName} {c.reportFile.lastName}</TableCell>
                                            <TableCell align='left'>{new Date(c.createdAt).toLocaleDateString("en-US", options)}</TableCell>
                                        </TableRow>
                                    )
                            })))}
                            {(caseType === 'Pending') &&
                            ((allPending.length > 0) && (
                                allPending.map((c) => {
                                    return (
                                        <TableRow 
                                            key={c._id} 
                                            onClick={() => handleRowClick(c._id)}
                                            hover>
                                            <TableCell align='left'>{c.reportFile.machineType}</TableCell>
                                            <TableCell align='left'>{c.status}</TableCell>
                                            <TableCell align="left">{c.reportFile.firstName} {c.reportFile.lastName}</TableCell>
                                            <TableCell align='left'>{new Date(c.createdAt).toLocaleDateString("en-US", options)}</TableCell>
                                        </TableRow>
                                    )
                            })))}
                            {(caseType === 'Handled') &&
                            ((allHandled.length > 0) && (
                                allHandled.map((c) => {
                                    return (
                                        <TableRow 
                                            key={c._id} 
                                            onClick={() => handleRowClick(c._id)}
                                            hover>
                                            <TableCell align='left'>{c.reportFile.machineType}</TableCell>
                                            <TableCell align='left'>{c.status}</TableCell>
                                            <TableCell align="left">{c.reportFile.firstName} {c.reportFile.lastName}</TableCell>
                                            <TableCell align='left'>{new Date(c.createdAt).toLocaleDateString("en-US", options)}</TableCell>
                                        </TableRow>
                                    )
                            })))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}