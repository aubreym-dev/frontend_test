import axios, { AxiosRequestConfig } from 'axios';

export const API = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 0,
    headers: {
        'Accept': 'application/json'
    }
});

export const catAPI = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    timeout: 0,
    headers: {
        'Accept': 'application/json'
    }
});

