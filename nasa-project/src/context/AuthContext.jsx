import { createContext, useContext, useState, useEffect } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loginErrors, setLoginErrors] = useState([]);
    const [registerErrors, setRegisterErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        const { data } = await axios.get('/api/user');
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    }

    const login = async ({ ...data }) => {
        await csrf();
        try {
            await axios.post('/login', data);
            await getUser();
            navigate('/');
        } catch (error) {
            if (error.response) {
                setLoginErrors(error.response.data.errors);
            }
        }
    }

    const register = async ({ ...data }) => {
        await csrf();
        try {
            await axios.post('/register', data);
            await getUser();
        } catch (error) {
            if (error.response) {
                setRegisterErrors(error.response.data.errors);
            }
        }
    }

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
            localStorage.removeItem('user');
            navigate('/')
        })
    }

    return (
        <AuthContext.Provider value={{ user, loginErrors, registerErrors, getUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    return useContext(AuthContext);
}
