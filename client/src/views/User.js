import React, { useState, useEffect } from "react";
import { userInfo, jwtToken } from '../components/Signals';
import '../style.css';
import './User.css';
import axios from "axios";

const User = () => {
    const id = userInfo.value.userid;
    console.log('ID: ', id);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataResponse = await axios.get(`/user/user/${id}`);
                console.log('UserData (User): ', userDataResponse.data);

                // Update to handle the new response structure
                const users = userDataResponse.data.data || [];
                setUserData(users);
            } catch (error) {
                console.log(error.message);
                alert('Could not load profile!');
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <div className='user-info-block'>
                <h2>User Data</h2>
                <table>
                    <tbody>
                        {userData.map(user => (
                            Object.entries(user).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
