import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as ThemeProviderSC } from 'styled-components';
import { lightTheme, darkTheme, baseTheme } from 'theme/mainTheme';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const darkMode = { ...baseTheme, ...darkTheme };
const lightMode = { ...baseTheme, ...lightTheme };

const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [appTheme, setAppTheme] = useState(lightMode);

    const setTheme = (mode, isDark) => {
        localStorage.setItem(
            'theme',
            JSON.stringify({ theme: mode, isDarkTheme: isDark })
        );
        setIsDarkTheme(isDark);
        setAppTheme(mode);
    };

    const toggleTheme = () => {
        if (appTheme === lightMode) setTheme(darkMode, true);
        else setTheme(lightMode, false);
    };

    useEffect(() => {
        const localTheme = JSON.parse(localStorage.getItem('theme'));
        if (localTheme) {
            setAppTheme(localTheme.theme);
            setIsDarkTheme(localTheme.isDarkTheme);
        }
    }, []);

    return (
        <ThemeProviderSC theme={appTheme}>
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