import axios from 'axios';

const useAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

useAxios.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);

useAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        if (error.response?.data?.message) {
            error.message = error.response.data.message;
        }
        return Promise.reject(error);
    }
);

export { useAxios };
export default useAxios;