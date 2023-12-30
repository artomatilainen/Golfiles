import React, { useState, useEffect, Fragment } from 'react';
import { userInfo, jwtToken } from '../components/Signals';

const Home = () => {
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Wait for userInfo to be updated
        while (!userInfo.value) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
        }

        // Now userInfo has a value
        setUserInformation(userInfo.value);
        console.log('UserInfo (home): ', userInfo.value);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Welcome to Golfiles!</h1>
      <p><p>Hello World!</p></p>
      {userInformation && (
        <Fragment>
          <p>Username: {userInformation.username}</p>
          <p>Created Date: {userInformation.createdate}</p>
          <p>Personal Data: {userInformation.personalData}</p>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
