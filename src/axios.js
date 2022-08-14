import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://superheroappnode2022.herokuapp.com'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;