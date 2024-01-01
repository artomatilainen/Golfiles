import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userInfo } from '../components/Signals';

const Home = () => {
  const [userInformation, setUserInformation] = useState(userInfo.value);

  useEffect(() => {
    const unsubscribe = userInfo.subscribe((newValue) => {
      console.log('UserInfo (home): ', newValue);
      setUserInformation(newValue);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Golfiles!</h1>
      {userInformation && userInformation.username && userInformation.userid ? (
        <div>
          <p>Username: {userInformation.username}</p>
          <p>UserID: {userInformation.userid}</p>
        </div>
      ) : (
        <div>
          <p>Hello world!</p>
          <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Sign Up!</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
