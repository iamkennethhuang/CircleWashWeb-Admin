import React, {useState, useEffect} from 'react';
import { Box, CssBaseline, Container, Typography, Avatar, TextField, Grid, Button, Card, CardContent} from '@mui/material';
import localstorageService from '../../services/localstorageService';
import { useNavigate, useParams } from 'react-router-dom';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import axios from 'axios';

export default function Case({fileCase}){
    const [sendVisible, setSendVisible] = useState(false);
    const [allEmails, setAllEmails] = useState([]);
    const [information, setInformation] = useState('');
    const navigate = useNavigate();
    let params = useParams();
    const caseId = params.id;

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/email/case',
            params: {
                caseId : caseId
            }
        })
        .then((res) => {
            setAllEmails(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const handleSendClick = () => {
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:5000/email/case/send',
            data: {
                caseId : caseId,
                recipientEmail : fileCase.reportFile.email,
                fileCase: fileCase,
                information: information
            }
        })
        .then((res) => {
            console.log('email response', res);
            setSendVisible(false);
            setInformation('');
            document.getElementById('emailInfo').value = '';
        })
        .catch((err) => {
            console.log(err);
        })
    }

    console.log("allEmails", allEmails);
    return(
        <Box sx={{display: 'flex', pt:3}}>
            <Container maxWidth='false'>
                <CssBaseline />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}> 
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{fontWeight: 700, fontSize: 25}}>
                                Case 
                            </Typography>
                            <Typography alignSelf='center' sx={{ml:3, fontSize: 18, color: '#5579C6'}}>
                                #{caseId}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', mt:3}}>
                            <Avatar sx={{bgcolor: "#002FA7"}}>
                                <SupportAgentIcon />
                            </Avatar>
                            <TextField
                                id="emailInfo"
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Response to this complain..."
                                onChange={(e) => setInformation(e.target.value)}
                                onFocus={() => setSendVisible(true)}
                                sx={{ml:4}}
                            />
                        </Box>
                        {(sendVisible) && 
                        (<Box sx={{width: '100%',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            mt: 1}}>
                            <Button onClick={() => {handleSendClick()}}
                                size='small' variant="contained">
                                Send
                            </Button>
                        </Box>)}
                        <Box sx={{mt:5}}>
                            <Typography sx={{fontWeight: 600, fontSize: 18}}>
                                Details 
                            </Typography>
                        </Box>
                        {(allEmails.length > 0) && (
                            allEmails.map(mail => (
                                <Box sx={{display: 'flex', mt:3}}>
                                    <Avatar sx={{bgcolor: "#002FA7"}}>
                                        <SupportAgentIcon />
                                    </Avatar>
                                    <Card sx={{ml: 3}}>
                                        <CardContent>
                                            <Typography>
                                                {mail.information}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))
                        )}
                    </Grid> 
                </Grid>
            </Container>
        </Box>
    );
}