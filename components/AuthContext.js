import React, { createContext, useState, useEffect } from 'react';
import { getLoginedUserDetails } from '@/pages/api/getLoginedUserDetails';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getLoginedUserDetails();
                if (userDetails) {
                    setSession(userDetails);
                }
            } catch (error) {
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;