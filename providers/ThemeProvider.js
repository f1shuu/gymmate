import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as themes from '../Themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.Dark);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme')
                if (savedTheme && themes[savedTheme]) setTheme(themes[savedTheme]);
            } catch (error) {
                console.error(error);
            }
        };
        loadTheme();
    }, []);

    const changeTheme = async (themeName) => {
        if (themes[themeName]) {
            setTheme(themes[themeName]);
            try {
                await AsyncStorage.setItem('theme', themeName);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
