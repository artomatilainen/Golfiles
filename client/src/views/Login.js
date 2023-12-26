import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react"
import axios from "axios";
import { jwtToken } from '../components/Signals';
import '../style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    const login = async () =>  {
        await axios.postForm('/auth/login', { username, pw })
            .then(resp => jwtToken.value = resp.data.jwtToken)
            .catch(error => console.log(error.message))

        if (jwtToken.value.length > 0) {
            console.log(jwtToken.value);
            window.location.href = ('/');
        }
    }

    return (
        <div class='page-content'>
            <div class='auth-form container'>
                <div class="title">Login</div>
                <input placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} /><br />
                <input placeholder='Password' type='password' onChange={e => setPw(e.target.value)} /><br />
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;