import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-52-67-204-185.sa-east-1.compute.amazonaws.com:3000'
});


export default api;