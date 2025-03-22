import { Container, styled } from '@mui/material';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { useTheme } from '../AppThemeProvider';
import FileExplorer from '../components/FileExplorer';
import { ThemeSwitch } from '../components/ThemeSwitch';

const StyledNav = styled('nav', {
  name: 'nav',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme.spacing(6),
  position: 'sticky',
  top: 0,
  height: '100vh',
  ['& .MuiSwitch-root']: {
    marginBottom: theme.spacing(2),
  },
}));

const RootRoute = () => {
  const { themeMode, toggleTheme } = useTheme();
  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme();
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
      <StyledNav>
        <ThemeSwitch checked={themeMode === 'dark'} onChange={handleChange} inputProps={{ 'aria-label': 'Toggle Theme' }} />
        <FileExplorer />
      </StyledNav>
      <Outlet />
    </Container>
  );
};

export const Route = createRootRouteWithContext<{}>()({
  component: () => <RootRoute />,
  notFoundComponent: () => <h1>404 caught in __root</h1>,
});
