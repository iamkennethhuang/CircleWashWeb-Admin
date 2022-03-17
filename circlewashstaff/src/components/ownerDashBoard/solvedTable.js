import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Toolbar, Box, Typography, IconButton, TableContainer, Table, TableHead} from '@mui/material';
import { TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const attributs = [{name: 'Customer', position: 'left'}, 
    {name: 'Date', position: 'left'},
    {name: 'Machine Type', position: 'left'},
    {name: 'Machine No.', position: 'right'}];

const options = {year: 'numeric', month: 'numeric', day: 'numeric',  hour: 'numeric', minute: 'numeric'};

export default class SolvedTable extends React.Component{

    constructor(props) {
        super(props);
        this.state =
        {
            page: 0,
            data: [],
            dataOrder: 1,
            id: null,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleFliterClick = this.handleFliterClick.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleSetData(newData){
        this.setState({data: newData});
    }

    handleFliterClick (){
        this.setState({dataOrder: (this.state.dataOrder * -1)})
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
        
    };

    handleRowClick = (complaint) => {
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
            this.setState({id: c._id});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:5000/reportFiles',
            params:{
                solvedStatus: true,
                dataOrder: this.state.dataOrder,
            }
        })
        .then((res) => { 
            this.handleSetData(res.data);
            // this.setState({data: res.data});
        })
        .catch((err) => console.log(err));
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.socket.on('fileUpdated', (data) => {
            axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:5000/reportFiles',
                params:{
                    solvedStatus: true,
                    dataOrder: this.state.dataOrder,
                }
            })
            .then((res) => { 
                this.handleSetData(res.data);
                
            })
            .catch((err) => console.log(err));
        })
        if(prevState.dataOrder != this.state.dataOrder){
            axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:5000/reportFiles',
                params:{
                    solvedStatus: true,
                    dataOrder: this.state.dataOrder,
                }
            })
            .then((res) => { 
                this.handleSetData(res.data);
                
            })
            .catch((err) => console.log(err));
        }
    }    


    render(){
        return(
            <Paper sx={{mt:5}}> 
                <CssBaseline />  
                {(this.state.id != null) && (
                    <Navigate to={`/case/dashboard/1/${this.state.id}`} />
                )}
                <Toolbar>
                    <Typography sx={{fontWeight: 700, fontSize: 20, flex:'1'}}>
                        Resolved Complaints
                    </Typography>
                    <Typography>
                        <IconButton onClick={this.handleFliterClick}>
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
                            {(this.state.data.length > 0) && this.state.data
                                .slice(this.state.page * 5, this.state.page * 5 + 5)
                                .map((d) => (
                                <TableRow hover key={d._id} 
                                onClick={() => this.handleRowClick(d)}>
                                    <TableCell align='left' sx={{color: '#65ABE2'}}> {d.firstName} {d.lastName}</TableCell>
                                    <TableCell align='left'> {new Date(d.date).toLocaleDateString("en-US", options)} </TableCell>
                                    <TableCell align='left'> {d.machineType} </TableCell>
                                    <TableCell align='right'> {d.machineNo} </TableCell>
                                </TableRow>
                                ))}
                            {(((this.state.page > -1) ? Math.max(0, (this.state.page + 1)* 5 - this.state.data.length) : 0) > 0) && (
                                <TableRow style={{
                                    height: 53 * ((this.state.page > -1) ? Math.max(0, (this.state.page + 1)* 5 - this.state.data.length) : 0),
                                }} >
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                rowsPerPageOptions={[]}
                component="div"
                count={this.state.data.length}
                rowsPerPage={5}
                page={this.state.page}
                onPageChange={this.handleChangePage}/>
            </Paper> 
        );
    }
}




