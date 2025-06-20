import axios from 'axios';

import { BACKEND_URL } from '@/config';

const strapi = axios.create({
    // baseURL: `${BACKEND_URL}/api`,
    baseURL: `http://localhost:1337/api`,
});



export default strapi;
