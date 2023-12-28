import React, { useState } from 'react';
import axios from 'axios';
import { jwtToken } from '../components/Signals';
import '../style.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    const signup = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('pw', pw);

        axios.post('/auth/register', formData)
            .then(resp => {
                jwtToken.value = resp.data.jwtToken;
                // Show success alert
                alert('Registration successful!'); 
            })
            .catch(error => {
                console.error(error.message);
                // Show error alert
                alert('Username already exists. Please choose another.');
            });
    };

    return (
        <>
            <div className='page-content'>
                <div className='auth-form container'>
                    <div className="title">Sign up</div>
                    <input placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} /><br />
                    <input placeholder='Password' type='password' onChange={e => setPw(e.target.value)} /><br />
                    <button onClick={signup}>Sign up</button>
                </div>
            </div>
        </>
    );
};

export default Signup;
