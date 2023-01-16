import axios from 'axios';

const api = axios.create({
    baseURL: 'http://11557.masterdaweb.net:3000'
});


export default api;