import React, {useState, useEffect} from 'react';
import { Box, CssBaseline, Container, Toolbar, Typography, TextField, Grid, Button, Tabs, Tab} from '@mui/material';
import localstorageService from '../../services/localstorageService';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../navbar/index';
import Case from '../case/index';
import Complaint from '../complaint/index';
import CaseSolution from '../caseSolution';
import axios from 'axios';

export default function CaseDashboard(){
    const navigate = useNavigate();
    const [user, setUser] = useState();
    let params = useParams();
    const caseId = params.id;
    const tap = Number(params.tap);
    const [loggedIn, setLoggedIn] = useState(false);
    const [value, setValue] = useState(tap);
    const [fileCase, setFileCase] = useState();

    console.log('file', fileCase);

    useEffect(() => {
        const loginValue = localstorageService.getLogInWithExpiry('login');
        if(loginValue === true){
            setLoggedIn(true);
        }
        axios({
            method:'get',
            withCredentials: true,
            url: 'http://localhost:5000/filecase/',
            params: {
                caseId: caseId
            }
        })
        .then((res) => {
            setFileCase(res.data[0]);
        })
        .catch((err) => {
            console.log(err.response.data);
        })
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/staff'
        })
        .then((res) => {
          setUser(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    if(loggedIn === false){
        navigate('/signin');
    }

    function TabPanel(props) {
        const { children, value, index} = props;
      
        return (
            <Container 
                maxWidth='false' 
                hidden={value !== index}>
                {(value === index) && (
                    children
                )}
            </Container>
        );
    }

    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <NavBar/>
            (<Container maxWidth='false'>
                <Toolbar />
                <Box sx={{ borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label='Case Communicate' />
                        <Tab label='Report File' />
                        <Tab label='Solution' />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {(fileCase) && (<Case caseId={caseId} fileCase={fileCase}/>)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {(fileCase) && (<Complaint complaint={fileCase.reportFile} />)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {(fileCase) && (<CaseSolution fileCase={fileCase} user={user}/>)}
                </TabPanel>
            </Container>)
        </Box>
    );
}