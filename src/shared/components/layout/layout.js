import React from 'react';
import PermanentDrawer from './drawer';
import Navbar from './Navbar';
import useTheme from '../../Hook/useTheme';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

const layout = (WrappedComponent) => {
  return function WithPermanentDrawer(props) {
    const theme = useTheme();

    return (
      <>
        <ThemeProvider theme={theme}>
          <PermanentDrawer>
            <Navbar />
            <Box
              sx={{
                padding: { xs: 2, sm: 3, md: 4 },
                minHeight: '100vh',
                background: '#f8fafc',
                marginTop: '64px',
              }}
            >
              <WrappedComponent {...props} />
            </Box>
          </PermanentDrawer>
        </ThemeProvider>
      </>
    );
  };
};

export default layout;
