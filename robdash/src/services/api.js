import axios from 'axios';


export const api = axios.create({
    baseURL: 'http://200.98.81.201:40160/rest'
});

export const apilocal = axios.create({
    baseURL: 'http://localhost:3333'
});


export const apiCustomers = axios.create({
    baseURL: 'http://200.98.81.201:40160/rest/Customers'
});
