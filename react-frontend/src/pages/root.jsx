import React, { useEffect } from 'react';
import {
  Outlet,
  useNavigation,
} from "react-router-dom";
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import getDashboardTheme from '../theme/getDashboardTheme';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';


export default function Root() {
  const [mode, setMode] = React.useState('light');
  const dashboardTheme = createTheme(getDashboardTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const contacts = [];
  const q = '';
  const navigation = useNavigation();

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <SideMenu contacts={contacts} q={q}/>
        <Navbar contacts={contacts} q={q} mode={mode} toggleColorMode={toggleColorMode} />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            position: { sm: 'relative', md: '' },
            top: { sm: '48px', md: '0' },
            height: { sm: 'calc(100vh - 48px)', md: '100vh' },
            flexGrow: 1,
            pt: 2,
            backgroundColor: alpha(theme.robotpi.lightBlue, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
            }}
          >
            <Header
              pageTitle={'Contacts'}
              q={q}
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
            <Box id="page-content" sx={{ height: 'calc(100vh - 64px)', width: '100%', pb: '16px' }}>
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
