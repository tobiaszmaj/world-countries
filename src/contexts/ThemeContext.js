import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as ThemeProviderSC } from 'styled-components';
import { lightTheme, darkTheme, baseTheme } from 'theme/mainTheme';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDark] = useState(false);

    const setMode = mode => {
        window.localStorage.setItem('isDarkTheme', mode);
        setIsDark(mode);
    };

    const toggleTheme = () => {
        setMode(!isDarkTheme);
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('isDarkTheme');
        if (localTheme) setIsDark(localTheme);
    }, []);

    return (
        <ThemeProviderSC
            theme={
                isDarkTheme
                    ? { ...baseTheme, ...darkTheme }
                    : { ...baseTheme, ...lightTheme }
            }
        >
            <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProviderSC>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default ThemeProvider;