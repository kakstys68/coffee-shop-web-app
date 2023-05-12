import React, {useState, useEffect} from 'react';
import { TextField, Button} from '@mui/material';
import './RegistrationPage.css'
import {theme} from '../../colors'
import { createOrder, createUser } from './client';
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({username: '', password: ''});

    const navigate = useNavigate(); 

    useEffect(() => {
        setValues({username, password});
    }, [username, password])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleButtonClick = async (event) => {
        event.preventDefault();
        setValues({username, password});
        const user = await createUser(values);
        createOrder(user.id);
        navigate(-1);
    }
    

    return (
        <>
        <div className='container'>
            
            <div>
                <img src='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjMzNi1maWxtZnVsLTQ2LWNvZmZlZV8yLmpwZw.jpg' alt='Logo' className='logo'></img>
            </div>

           <h2>Create a new account</h2>

           <div className='text-fields'>
            <TextField id="username-field" label="Username" variant="outlined" theme={theme} color='primary' onChange={handleUsernameChange}/>
           </div>

           <div className='text-fields'>
            <TextField id="password-field" label="Password" variant="outlined" theme={theme} onChange={handlePasswordChange} />
           </div>
           
           <span className='login-button'>
            <Button variant="contained" theme={theme} onClick={handleButtonClick}>Create account</Button>
           </span>
           
        </div>
        </>
    );
};