import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance;