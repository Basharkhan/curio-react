import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// create context
export const AuthContext = createContext()

// provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                
                if(decoded.exp * 1000 > Date.now()){
                    setUser({token, ...decoded});
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        try {
            const decoded = jwtDecode(token);
            setUser({token, ...decoded});
        } catch (error) {
            console.log("Invalid token", error);            
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);  
    }

    return(
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider> 
    );
}
