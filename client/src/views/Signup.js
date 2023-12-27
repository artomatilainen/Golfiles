import React, { useState } from 'react';
import axios from 'axios';
import { jwtToken } from '../components/Signals';
import '../style.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signup = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('pw', pw);

        axios.post('/auth/register', formData)
            .then(resp => {
                jwtToken.value = resp.data.jwtToken;
                // Reset error message on successful registration
                setErrorMessage('');
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    // HTTP 409 (Conflict) indicates that the username is already in use
                    setErrorMessage('Username is already taken. Please choose another.');
                } else {
                    // Handle other errors
                    console.error(error.message);
                    setErrorMessage('Registration failed. Please try again.');
                }
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </>
    );
};

export default Signup;
