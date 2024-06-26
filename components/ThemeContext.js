import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) =>
{
    const [themeMode, setThemeMode] = useState('light');

    useEffect(() =>
    {
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode) {
            document.documentElement.classList.toggle('dark', savedMode === 'dark');
            setThemeMode(savedMode);
        } else {
            localStorage.setItem('themeMode', 'light');
        }
    }, []);

    const toggleTheme = () =>
    {
        const mode = themeMode === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', mode === 'dark');
        localStorage.setItem('themeMode', mode);
        setThemeMode(mode);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
