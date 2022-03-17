import React, {useState} from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function PasswordPopup(props){
    const [password, setPassword] = useState('');

    const handleClose = () => {
        props.setOpenPassword(false);
    }

    const handleSubmit = () => {
        props.setOpenPassword(false);
        axios({
            method:'put',
            withCredentials: true,
            url: 'http://localhost:5000/staff/password',
            data: {
                password: password,
            }
        })
        .then((res) => {
            console.log('password response', res);
        })
        .catch((err) => {
            console.log(err)
        })
    }

 
    return(
        <Dialog open={props.openPassword} onClose={handleClose}>
            <DialogTitle>Edit your password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If the linked FasCard account's password had been updated recently, 
                    please match your password with FasCard admin account's password. 
                    Non-matching password would lead to account's activity being restricted.
                </DialogContentText>
                <TextField
                    margin='dense'
                    id='phone'
                    label='New password'
                    fullWidth
                    variant='standard'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <DialogActions>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}