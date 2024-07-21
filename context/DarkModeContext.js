"use client";
import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(darkMode);
        if (darkMode) {
            document.body.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            if (newMode) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            return newMode;
        });
    }, []);

    const contextValue = useMemo(() => ({
        isDarkMode,
        toggleDarkMode
    }), [isDarkMode, toggleDarkMode]);

    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);
