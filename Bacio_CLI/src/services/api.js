import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ssnp9k.tst.protheus.totvscloud.com.br:34187/REST/apiteste'
});


export default api;