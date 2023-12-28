import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { jwtToken } from '../components/Signals';
import '../style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    const login = async () => {
        try {
            const resp = await axios.postForm('/auth/login', { username, pw });
            jwtToken.value = resp.data.jwtToken;
            // Show success alert
            alert('Login successful!');
            // Navigate to the home page
            window.location.href = '/';
        } catch (error) {
            console.log(error.message);
            // Show error alert
            alert('Login fails. Please check your username and pin.');
        }
    };

    return (
        <div className='page-content'>
            <div className='auth-form container'>
                <div className="title">Login</div>
                <input placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} /><br />
                <input placeholder='Password' type='password' onChange={e => setPw(e.target.value)} /><br />
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;
