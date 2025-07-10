import { adminLoginData, NewUser, User, UserLoginData } from "@/types";
import strapi from "./strapi";
import { strapiUrlQueryBuilder } from "@/utils/strapiUrlQueryBuilder";
import { BACKEND_URL } from "@/config";
const userPopulateFields = [
    'role',
    'profilePicture',
    'registrations',
    'rsvps',
    'rsvps.event',
    'registrations.group'
]
const groupPopulateFields = [
    // 'facilitators',
    'coverImage'
]
const eventPopulateFields = [
    'group',
    'rsvps',
    'rsvps.user',
    'image'
]
const api = {
    getAllSupportGroups: async () => {
        const response = await strapi.get(`/api/groups?${strapiUrlQueryBuilder(...groupPopulateFields)}`);
        if (!response.data) {
            throw new Error('Failed to fetch support groups');
        }
        return response.data;
    },
    getSupportGroupById: async (id: string) => {
        const response = await strapi.get(`/api/groups/${id}`);
        if (!response.data) {
            throw new Error('Failed to fetch support group');
        }
        return response.data;
    },
    getAllEvents: async () => {
        const response = await strapi.get(`/api/events?${strapiUrlQueryBuilder(...eventPopulateFields)}`);
        if (!response.data) {
            throw new Error('Failed to fetch events');
        }
        return response.data;
    },
    getEventsByFilters: async (filterParams: string) => {
        const response = await strapi.get(`/api/events?${strapiUrlQueryBuilder(...eventPopulateFields)}${filterParams}`);
        if (!response.data) {
            throw new Error('Failed to fetch events');
        }
        return response.data;
    },
    getEventById: async (id: string) => {
        const response = await strapi.get(`/api/events/${id}`);
        if (!response.data) {
            throw new Error('Failed to fetch event');
        }
        return response.data;
    },
    login: async (loginData: UserLoginData) => {
        const response = await strapi.post('/api/auth/local', loginData);


        if (!response) {
            throw new Error('Failed to login');
        }
        const data = await response.data;
        return data;
    },
    adminLogin: async (loginData: adminLoginData) => {
        const response = await strapi.post(`${BACKEND_URL}/admin/login`, {
            email: loginData.email,
            password: loginData.password,
        });


        if (!response) {
            throw new Error('Failed to login');
        }
        const data = await response.data;
        return data;
    },
    register: async (user: NewUser) => {
        const userPayload = {
            username: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: user.password,
            role: user.role,
            firstname: user.firstName,
            lastname: user.lastName
        }
        const response = await strapi.post('/api/register', {
            data: userPayload
        });
        if (!response.data) {
            throw new Error('Failed to register');
        }
        const data = await response.data;

        return data;
    },
    getUserInfo: async () => {
        const response = await strapi.get(`/api/users/me?${strapiUrlQueryBuilder(...userPopulateFields)}`);
        if (!response.data) {
            throw new Error('Failed to fetch user info');
        }
        const data = await response.data;
        return data;
    },
    updateUserInfo: async (userData: Partial<User>) => {
        const response = await strapi.put(`/api/users/${userData.id}`, userData);
        if (!response.data) {
            throw new Error('Failed to update user info');
        }
        const data = await response.data;

        return data;
    },

    getAllUsers: async () => {
        const response = await strapi.get(`/api/users?${strapiUrlQueryBuilder('role', 'registrations', 'registrations.group')}`);
        if (!response.data) {
            throw new Error('Failed to fetch users');
        }
        return response.data;
    }
}

export default api;