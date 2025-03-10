import { useColorScheme } from '@mui/material';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Create the ThemeContext
const ThemeContext = createContext({
  themeMode: 'light', // Default theme mode
  toggleTheme: () => {}, // Function to toggle theme
});

export const useTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useColorScheme();
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || mode || 'light');

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ themeMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};
