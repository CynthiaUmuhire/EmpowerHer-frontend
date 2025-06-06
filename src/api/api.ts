import { register } from "module";

const baseUrl = process.env.BACKEND_URL || 'http://localhost:3000';

  const api = {
    getAllSupportGroups: async () => {
        const response = await fetch(`${baseUrl}/api/groups`);
        if (!response.ok) {
            throw new Error('Failed to fetch support groups');
        }
        return response.json();
    },
    getSupportGroupById: async (id: string) => {
        const response = await fetch(`${baseUrl}/api/groups/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch support group');
        }
        return response.json();
    },
    getAllEvents: async () => {
        const response = await fetch(`${baseUrl}/api/events`);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        return response.json();
    },
    getEventById: async (id: string) => {
        const response = await fetch(`${baseUrl}/api/events/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch event');
        }
        return response.json();
    },
    login : async (phoneNumber, password) => {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                identifier: phoneNumber,
                password: password
             }),
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        
        return data;
    },

    register: async (name, phoneNumber, password, email) => {
        const response = await fetch(`${baseUrl}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: name,
                phoneNumber: phoneNumber,
                password: password,
                email: email
             }),
        });
        if (!response.ok) {
            throw new Error('Failed to register');
        }
        const data = await response.json();
        
        return data;
    }
}

export default api;