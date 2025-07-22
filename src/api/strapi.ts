import axios from 'axios';

import { BACKEND_URL, ADMIN_API_TOKEN } from '@/config';
const strapi = axios.create({
    baseURL: `${BACKEND_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },


});
// Log the admin a secret token to the console for debugging purposes with ****
console.log('Admin token', ADMIN_API_TOKEN.replace(/d/g, '*'));
strapi.interceptors.request.use(
    config => {
        if (config.headers.Authorization) {
            return config;
        }
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin' && ADMIN_API_TOKEN) {
            config.headers.Authorization = `Bearer ${ADMIN_API_TOKEN}`;
            return config;
        }
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
