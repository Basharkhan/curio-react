import API from "./api";

export const authService = {
    login: (credentials) => API.post("/auth/login", credentials),
    register: (userData) => API.post("/auth/register/user", userData),
}