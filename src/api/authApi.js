
import api from './axiosConfig';

export const registerUser = (data) => api.post('/auth/register/user', data);
export const loginUser = (data) => api.post('/auth/login', data);