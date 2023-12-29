import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { userInfo, jwtToken } from '../components/Signals';
import '../style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    const login = async () => {
        try {
            const resp = await axios.postForm('/auth/login', { username, pw });

            console.log('Resp: ', resp.data);
            // Update userInfo and userId
            userInfo.value = {
                userId: resp.data.userId,
                username: resp.data.username,
            };
            console.log('UserInfo (login): ', userInfo.value);
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
