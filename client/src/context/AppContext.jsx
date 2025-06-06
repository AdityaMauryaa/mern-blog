import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState('');
    const [globalName, setGlobalName] = useState(() => localStorage.getItem('globalName') || '');

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `${storedToken}`;
        }
    }, []);
      useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    if (globalName) {
      localStorage.setItem('globalName', globalName);
    } else {
      localStorage.removeItem('globalName');
    }
  }, [globalName]);
    useEffect(() => {
        fetchBlogs();
    }, []);

    const value = {
        globalName,
        setGlobalName,
        axios,
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        fetchBlogs,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
