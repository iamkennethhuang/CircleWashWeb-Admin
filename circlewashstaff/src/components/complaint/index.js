import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Container, Typography, Grid, List, ListSubheader, ListItem, ListItemText} from '@mui/material';
import axios from 'axios';
import { CssBaseline } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CustomPie from './customPie';
import CustomLine from './customLine';

export default function Complaint ({complaint}){
    const [pieData, setPieData] = useState();
    const [allError, setAllError] = useState();
    const [lineData, setLineData] = useState();
    const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};
    const apiOption = {year: 'numeric', month: 'numeric', day: 'numeric'};
    
    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/fascard/line',
            params: {
                machNo: complaint.machineNo,
                date: complaint.date
            }
        })
        .then((res) => {
            console.log('line', res.data);
            setLineData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/fascard/pie',
            params: {
                machNo: complaint.machineNo,
                date: complaint.date
            }
        })
        .then((res) => {
            console.log('pie', res.data);
            setPieData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/fascard/all/error',
            params: {
                machNo: complaint.machineNo,
                date: complaint.date
            }
        })
        .then((res) => {
            console.log('all error', res.data);
            setAllError(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <Box sx={{display: 'flex', pt:3}}>
            <CssBaseline />           
            <Container maxWidth='false' sx={{}}>
                <Box sx={{display: 'flex', mb: 3}}>
                    <Typography sx={{fontWeight: 700, fontSize: 25}}>
                        Complaint 
                    </Typography>
                    <Typography alignSelf='center' sx={{fontSize: 18, ml:3, color: '#5579C6'}}>
                        #{complaint._id}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <Box sx={{
                            background:'#EFF1F2',
                            height: '100%',
                            pt: 2,
                            pl: 2,
                            pb: 2,
                            pr: 2
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3}}>
                                Customer Information 
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Name: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.firstName} {complaint.lastName}
                                </Typography>    
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Phone: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.phone}
                                </Typography>     
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between',}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Email: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.email}
                                </Typography>      
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box sx={{
                            background:'#EFF1F2',
                            height: '100%',
                            pt: 2,
                            pl: 2,
                            pb: 2,
                            pr: 2
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3}}>
                                Complaint Detail
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Machine Type:
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.machineType}
                                </Typography>     
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Machine No.: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.machineNo}
                                </Typography>     
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Amount: 
                                </Typography>          
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.amount} usd
                                </Typography>   
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Payment method: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.payType} 
                                </Typography>     
                            </Box>
                            {(complaint) && ((complaint.payType === 'FasCard') && 
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    FasCard Number: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.fasCardNum} 
                                </Typography>   
                            </Box>)}
                            {(complaint.payType === 'CreditCard') && 
                            (<Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Credit/Debit Card (last 4 digits): 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.creditCardNum} 
                                </Typography>     
                            </Box>)}
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Date: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {new Date(complaint.date).toLocaleDateString("en-US", options)} 
                                </Typography>      
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between',}}>   
                                <Typography sx={{fontWeight: 500, fontSize: 16, mr: 1}}>
                                    Details: 
                                </Typography>
                                <Typography sx={{fontWeight: 300, fontSize: 16}}>
                                    {complaint.description} 
                                </Typography>      
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{}}>
                        <Box sx={{
                            background:'#EFF1F2',
                            height: '100%',
                            pt: 2,
                            pl: 2,
                            pr: 2,
                            pb:2
                            }}>
                            <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3}}>
                                Machine #{complaint.machineNo} Errors on {new Date(complaint.date).toLocaleDateString("en-US", apiOption)} 
                            </Typography>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 'false',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    '& ul': { padding: 0 },
                                }}
                                subheader={<li />}>
                                {(allError) && ((allError.MaintError.length > 0 || allError.MlvMachError.length > 0) ? (["MaintError", 'MlvMachError'].map((errType) => (
                                    <li key={`error-type-${errType}`}>
                                        <ul>
                                            <ListSubheader>
                                                `${errType}`
                                            </ListSubheader>
                                            {(allError[errType]).map((errorInfo) => (
                                                <ListItem key={`item-${errType}-${errorInfo}`}>
                                                    <ListItemText primary={`${errorInfo.note} at ${new Date(errorInfo.time).toLocaleDateString("en-US", options)}`} />
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </li>
                                ))): (
                                    <ListItem key={`item-no-error`}>
                                        <ListItemText primary={"No Error Found"} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    
                </Grid>  
            </Container>
        </Box>
    );
}

{/* <Grid item xs={6} sx={{height: '42%'}}>
    <Box sx={{
        background:'#EFF1F2',
        height: '100%',
        pt: 2,
        }}>
        <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3, pl: 2}}>
            Machine #{complaint.machineNo} Status on {new Date(complaint.date).toLocaleDateString("en-US", apiOption)} 
        </Typography>
        {(pieData) && <CustomPie data={pieData}/>}
    </Box>  
</Grid> */}

{/* <Grid item xs={8} sx={{height:'88%'}}>
    <Box sx={{
        background:'#EFF1F2',
        height: '100%',
        pt: 2,
        pl: 2,
        pr: 2,
        pb:2
        }}>
        <Typography sx={{fontWeight: 700, fontSize: 20, mb: 3, pl: 2}}>
            Machine #{complaint.machineNo} Status on {new Date(complaint.date).toLocaleDateString("en-US", apiOption)} 
        </Typography>
        {(lineData) && <CustomLine data={lineData} />}
    </Box>
</Grid> */}