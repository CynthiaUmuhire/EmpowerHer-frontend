import axios from 'axios';

import { BACKEND_URL } from '@/config';

const strapi = axios.create({
    baseURL: `${BACKEND_URL}/api`,

});
console.log('Strapi API URL:', strapi);
strapi.interceptors.request.use(
    config => {
        if (config.headers.Authorization) {
            return config;
        }
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default strapi;
