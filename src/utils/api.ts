import axios from 'axios';
import type { Post, User } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const createApi = () =>
    axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

let api = createApi();

export const setupInterceptors = () => {
    api.interceptors.response.use(undefined, async (error) => {
        const { config } = error;

        if (
            error.code === 'ECONNABORTED' ||
            error.message?.includes('timeout') ||
            !error.response
        ) {
            config.retryCount = config.retryCount || 0;

            if (config.retryCount < 3) {
                config.retryCount += 1;
                config.timeout = config.timeout * 1.5;
                return api(config);
            }
        }

        return Promise.reject(error);
    });
};

export const setApiInstance = (instance: typeof api) => {
    api = instance;
};

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
};

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts', {
        params: { userId },
    });
    return response.data;
};
