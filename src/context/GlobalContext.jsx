import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
const API = import.meta.env.VITE_API_BASE_URL ;



const GlobalContext = createContext();

export const useGlobalcontext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
        setLoading(false);
    }, []);


    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // contact form api

    const submitContact = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API}user/ads/contactform`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        } catch (error) {
            throw error.response?.data?.msg || "Something went wrong";
        }
    };



    return (
        <GlobalContext.Provider value={{ user, token, login, logout, loading, submitContact }}>
            {children}
        </GlobalContext.Provider>
    );
};
