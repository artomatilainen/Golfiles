import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react"
import axios from "axios";
import { jwtToken } from '../components/Signals';
import '../style.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    function signup() {
        axios.postForm('/auth/register', { username, pw })
            .then(resp => jwtToken.value = resp.data.jwtToken)
            .catch(error => console.log(error.message))
    }

    return (
        <div class='page-content'>
            <div class='auth-form container'>
                <div class="title">Sign up</div>
                <input placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} /><br />
                <input placeholder='Password' type='password' onChange={e => setPw(e.target.value)} /><br />
                <button onClick={signup}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;