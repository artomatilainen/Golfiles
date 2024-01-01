import { signal, effect } from "@preact/signals-react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001';

// Initialize userInfo with default values
export const userInfo = signal({
  userid: null,
  username: null,
});

export const jwtToken = signal(getSessionToken());

function getSessionToken() {
  const t = sessionStorage.getItem('token');
  return t === null || t === 'null' ? '' : t;
}

effect(async () => {
  try {
    sessionStorage.setItem('token', jwtToken.value);

    if (jwtToken.value.length !== 0) {
      const resp = await axios.get('/user/personal', {
        headers: { Authorization: "Bearer " + jwtToken.value }
      });

      const userResponse = resp.data.data; // Extract user data from the response
      userInfo.value = {
        userid: userResponse.userid,
        username: userResponse.username,
      };

      console.log('userInfo (signals): ', userInfo.value);
    } else {
      userInfo.value = { userid: null, username: null };
    }
  } catch (error) {
    console.error(error.message);
    userInfo.value = { userid: null, username: null }; // Set userInfo to null in case of an error
  }
}, [jwtToken.value]);
