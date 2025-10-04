import { createContext, useContext, useEffect, useState } from "react";
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async() => {
            const storedToken = localStorage.getItem("token");
            if(!storedToken) {
                setLoading(false);
                return;
            }

            try{
                const response = await authService.currentUser();
                
                setUser(response.data.data);
                setToken(storedToken);
                localStorage.setItem("user", JSON.stringify(response.data.data));
            } catch(error) {
                console.log("Got an error: " + error);                
                logout();
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    const login = async (loginData) => {
        try {
            const response = await authService.login(loginData);
            const {token, userDetailsDto} = response.data.data;
            setToken(token);
            setUser(userDetailsDto);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userDetailsDto));

            return {success: true};            
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    }

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => !!token;

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        loading: false // Simple loading state
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}