import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SeatsDashboard from './Dashboard/SeatsDashboard';
import renderDrawer from './Drawer';
const drawerWidth = 240;


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5" style={{ fontWeight: 'bold' }} >Movies Ticket Booking</Typography>
        </Toolbar>
      </AppBar>
      {renderDrawer(isMobile, isDrawerOpen, toggleDrawer)}
      <Box sx={{ display: 'flex' }}>
        <Container sx={{ marginRight: isMobile ? '0' : '64px', marginTop: '80px' }}>
          <SeatsDashboard />
        </Container>
      </Box>
      <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="body2" align="center">
         
        </Typography>
      </Box>
    </div>
  );
}

export default App;
