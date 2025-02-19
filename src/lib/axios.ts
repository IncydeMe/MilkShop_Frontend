import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios;