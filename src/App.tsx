import './App.css';

import { CssBaseline } from '@mui/material';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import { AppRouter } from './AppRouter';
import { darkTheme, lightTheme } from './AppTheme';
import { useTheme } from './AppThemeProvider';

import VaultJSON from '../src/assets/obsidious-index.json' assert { type: 'json' };;
import { Obsidious } from 'remark-obsidious';
import type {ObsidiousVaultData} from 'remark-obsidious' ;


export default function App() {
  const { themeMode } = useTheme();

  const typedVaultData = VaultJSON as ObsidiousVaultData;
  Obsidious.initialize(typedVaultData);
  
  return (
    <ThemeProvider theme={responsiveFontSizes(themeMode === 'light' ? lightTheme : darkTheme)}>
      <CssBaseline enableColorScheme />
      <AppRouter />
    </ThemeProvider>
  );
}
