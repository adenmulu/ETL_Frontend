import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const LinkListItem = styled(ListItem)(({ theme }) => ({
  '& a': {
    color: 'white',
    textDecoration: 'none',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  '&.active a': {
    textDecoration: 'underline',
  },
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
}));

const NavigationBar = ({ onLogout }) => {
  const theme = useTheme();
  const userName = localStorage.getItem('userName');
  const role = localStorage.getItem('role');

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: '#37474f' }}>
        <Toolbar sx={{ backgroundColor: '#37474f' }}>
          <PersonIcon sx={{ color: 'white', marginRight: '0.5rem' }} /> {/* Person icon */}
          <Typography variant="body2" sx={{ color: 'white', marginRight: 'auto' }}>
            Logged in as: {userName} ({role})
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            The web app to view sales transactions for all branches
          </Typography>
          <Button
            color="inherit"
            onClick={() => window.open('https://servicedesk.inchcapedigital.com/')}
            sx={{ backgroundColor: '#263238', marginLeft: 'auto', marginRight: '1rem' }}
          >
            Need Support
          </Button>
          <Button color="inherit" onClick={onLogout} sx={{ backgroundColor: '#263238' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#37474f',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <List>
          {role === 'admin' && (
            <>
              <LinkListItem button component={NavLink} to="/dashboard/otsales" activeClassName="active">
                <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="OT Sales" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/CustomerData" activeClassName="active">
                <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="Customer Sales History" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/salesreport" activeClassName="active">
                <BarChartIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="Sales Report" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/usermanagement" activeClassName="active">
                <PeopleIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="User Management" sx={{ color: 'white' }} />
              </LinkListItem>
            </>
          )}
          {role === 'all' && (
            <>
              <LinkListItem button component={NavLink} to="/dashboard/otsales" activeClassName="active">
                <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="OT Sales" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/CustomerData" activeClassName="active">
                <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="Customer Sales History" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/salesreport" activeClassName="active">
                <BarChartIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="Sales Report" sx={{ color: 'white' }} />
              </LinkListItem>
            </>
          )}
          {role === 'ot' && (
            <LinkListItem button component={NavLink} to="/dashboard/otsales" activeClassName="active">
              <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
              <ListItemText primary="OT Sales" sx={{ color: 'white' }} />
            </LinkListItem>
          )}
          {role === 'sales' && (
            <>
              <LinkListItem button component={NavLink} to="/dashboard/otsales" activeClassName="active">
                <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="OT Sales" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/CustomerData" activeClassName="active">
                <DashboardIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="Customer Sales History" sx={{ color: 'white' }} />
              </LinkListItem>
              <LinkListItem button component={NavLink} to="/dashboard/salesreport" activeClassName="active">
                <BarChartIcon sx={{ color: '#e3f2fd', marginRight: 2 }} />
                <ListItemText primary="Sales Report" sx={{ color: 'white' }} />
              </LinkListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavigationBar;
