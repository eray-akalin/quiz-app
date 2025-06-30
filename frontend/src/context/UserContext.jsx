import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    // Backend'deki session'dan kullanıcıyı çek (özellikle Google login sonrası)
    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:3000/api/users/me', { withCredentials: true })
                .then(res => {
                    setUser(res.data);
                })
                .catch(() => {
                    // Session yoksa sessizce geç
                });
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
