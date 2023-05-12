import { TextField, Button } from '@mui/material';
import './LoginPage.css'
import {theme} from '../../colors'
import { useNavigate } from 'react-router-dom';
import { loginUser } from './client';
import { useEffect, useState } from 'react';

export const LoginPage = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({username: '', password: ''});


    const handleLoginClick = async (event) => {
        event.preventDefault();
        try {
            const userId = await loginUser(values);
            localStorage.setItem('currentUser', userId.id);
            navigate('/home');
          } catch (error) {
            alert('Wrong credentials');
            throw new Error(`HTTP error! status: ${error}`);
          }
    }

    useEffect(() => {
        setValues({username, password});
    }, [username, password])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const navigate = useNavigate();

    const handleClickSignUp = () =>{
        navigate("/sign-up");
    }

    return (
        <>
        <div className='container'>
            
            <div>
                <img src='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjMzNi1maWxtZnVsLTQ2LWNvZmZlZV8yLmpwZw.jpg' alt='Logo' className='logo'></img>
            </div>

           <h2>Login to your account</h2>

           <div className='text-fields'>
            <TextField id="username-field" label="Username" variant="outlined" theme={theme} color='primary' onChange={handleUsernameChange}/>
           </div>

           <div className='text-fields'>
            
            <TextField id="password-field" label="Password" variant="outlined" theme={theme} onChange={handlePasswordChange} />
           </div>

           <span className='login-button'>
            <Button variant="contained" theme={theme} onClick={handleLoginClick}>Login</Button>
           </span>
           
           <span className='login-button'>
            <Button variant="contained" theme={theme} onClick={handleClickSignUp}>Sign up</Button>
           </span>
           
        </div>
        </>
    );
};