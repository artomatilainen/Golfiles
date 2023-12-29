// signals.js

import { signal, effect } from "@preact/signals-react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001';

export const jwtToken = signal(getSessionToken());
export const userInfo = signal(null);

function getSessionToken(){
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

            userInfo.value = resp.data;
            console.log('userInfo (signals): ', userInfo.value);
        } else {
            userInfo.value = null;
        }
    } catch (error) {
        console.error(error.message);
    }
}, [jwtToken.value]);
