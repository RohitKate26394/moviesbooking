import React from 'react';
import { Drawer, Toolbar, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

const drawerWidth = 240;

const renderDrawer = (isMobile, isDrawerOpen, toggleDrawer) => {
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Book Ticket'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Dashboard', 'Book Ticket'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default renderDrawer;
