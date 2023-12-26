import React from 'react';
import { useState, useEffect } from "react"
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
                //const userDataResponse = await axios.get(`/user/${id}`);
                //setUserData(userDataResponse.data);

                const scoresResponse = await axios.get(`/scores/user/${id}`);
                setScoreData(scoresResponse.data);
            }
            catch (error) {
                console.log(error.message);
                alert('Could not load profile!');
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <div className='user-info-block'>
                <p className='user-name-text'>username1</p>
            </div>
            <div className='user-scores-block'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Score</th>
                            <th>Type</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scoreData.map((x, index) =>
                                <tr key={index}>
                                    <td>?</td>
                                    <td>{x.score} pts</td>
                                    <td>{x.isMovie ? 'Movie' : 'TV' }</td>
                                    <td>{'#' + x.entryid}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;