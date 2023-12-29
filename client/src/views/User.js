import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { userInfo } from '../components/Signals';
import '../style.css';
import './User.css';
import axios from "axios";

const User = () => {

    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [scoreData, setScoreData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataResponse = await axios.get(`/user/user/{$id}`);
                console.log('setUserData: ', userDataResponse.data);
                setUserData(userDataResponse.data);
            } catch (error) {
                console.log(error.message);
                alert('Could not load profile!');
            }
        }

        fetchData();
    }, [id]);

    return (
        <div>
            <div className='user-info-block'>
                <p className='user-name-text'>{userData.username}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Created date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userData.username}</td>
                            <td>{userData.create_time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
