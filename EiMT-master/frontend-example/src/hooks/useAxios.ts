import axios from 'axios';

export const useAxios = axios.create({
    // Use same-origin /api; Vite dev server proxies to the backend.
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosHeaders = {
    // Token can be provided via Vite env (e.g. VITE_TOKEN) if you want to test protected endpoints.
    ...(import.meta.env.VITE_TOKEN
        ? { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` }
        : {})
};
