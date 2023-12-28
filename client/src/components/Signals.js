import { effect, signal } from "@preact/signals-react";
import axios from "axios";

// Setting the global base URL for axios
axios.defaults.baseURL = 'http://localhost:3001';

// Signal for JWT token that is initialized from the session storage.
export const jwtToken = signal(getSessionToken());

// User info based on the token.
export const userInfo = signal(null);

// User ID based on the token.
export const userId = signal(null);

function getSessionToken() {
    const t = sessionStorage.getItem('token');
    return t === null || t === 'null' ? '' : t;
}

// Every time the token changes, updating the session storage.
// Also getting the userInfo with the token.
effect(() => {
    sessionStorage.setItem('token', jwtToken.value);

    if (jwtToken.value.length !== 0) {
        axios.get('/user/personal', { headers: { Authorization: "Bearer " + jwtToken.value } })
            .then(resp => {
                userInfo.value = resp.data;
                userId.value = resp.data.userid; // Assuming the user ID is available in the response
            })
            .catch(error => console.log(error.message))
    } else {
        userInfo.value = null;
        userId.value = null;
    }
});
