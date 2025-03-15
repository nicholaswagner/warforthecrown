import './App.css';

import { CssBaseline } from '@mui/material';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import { AppRouter } from './AppRouter';
import { darkTheme, lightTheme } from './AppTheme';
import { useTheme } from './AppThemeProvider';

export default function App() {
  const { themeMode } = useTheme();

  return (
    <ThemeProvider theme={responsiveFontSizes(themeMode === 'light' ? lightTheme : darkTheme)}>
      <CssBaseline enableColorScheme />
      <AppRouter />
    </ThemeProvider>
  );
}
