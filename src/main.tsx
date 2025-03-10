import "@fontsource/gentium-book-plus";

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AppThemeProvider } from './AppThemeProvider';

const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
);
