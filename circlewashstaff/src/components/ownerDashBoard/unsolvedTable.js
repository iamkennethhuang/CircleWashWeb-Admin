import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Toolbar, Box, Typography, IconButton, TableContainer, Table, TableHead} from '@mui/material';
import { TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


export default function UnSolvedTable({socket}){
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [dataOrder, setDateOrder] = useState(1);
    let navigate = useNavigate();

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/reportFiles',
            params:{
                solvedStatus: false,
                dataOrder: dataOrder,
            }
        })
        .then(function (res){ 
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [dataOrder]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleFliterClick = () => {
        setDateOrder(dataOrder *  -1);
    }

    const handleRowClick = (complaint) => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/filecase/file',
            params: {
                fileId: complaint._id
            }
        })
        .then((res) => {
            const c = res.data[0];
            navigate(`/case/dashboard/1/${c._id}`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const attributs = [{name: 'Customer', position: 'left'}, 
    {name: 'Date', position: 'left'},
    {name: 'Machine Type', position: 'left'},
    {name: 'Machine No.', position: 'right'}];

    const emptyRows = 
        (page > -1) ? Math.max(0, (page + 1)* 5 - data.length) : 0;

    const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};

    socket.on('fileUpdated', (data) => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/reportFiles',
            params:{
                solvedStatus: false,
                dataOrder: dataOrder,
            }
        })
        .then(function (res){ 
            setData(res.data);
        })
        .catch((err) => console.log(err));
    });
    
    return(
        <Paper sx={{mt:5}}> 
            <CssBaseline />  
            <Toolbar>
                <Typography sx={{fontWeight: 700, fontSize: 20, flex:'1'}}>
                    Open Complaints
                </Typography>
                <Typography>
                    <IconButton onClick={handleFliterClick}>
                        <FilterListIcon />
                    </IconButton>
                </Typography>
            </Toolbar>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            {attributs.map((attribute) => (
                                <TableCell key={attribute.name} align={attribute.position} sx={{fontWeight: 600}}> {attribute.name} </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data.length > 0) && data
                            .slice(page * 5, page * 5 + 5)
                            .map((d) => (
                            <TableRow hover key={d._id} onClick={() => handleRowClick(d)}>
                                <TableCell align='left' sx={{color: '#65ABE2'}}> {d.firstName} {d.lastName}</TableCell>
                                <TableCell align='left'> {new Date(d.date).toLocaleDateString("en-US", options)} </TableCell>
                                <TableCell align='left'> {d.machineType} </TableCell>
                                <TableCell align='right'> {d.machineNo} </TableCell>
                            </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{
                                height: 53 * emptyRows,
                              }} >
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
            rowsPerPageOptions={[]}
            component="div"
            count={data.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}/>
        </Paper> 
    );
}