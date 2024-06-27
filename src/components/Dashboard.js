// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const dashboardImage = '/your-image.jpg';
const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    // Check login status from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setLoginStatus('Login failed. Please login again.');
    } else {
      // Simulate a successful login message
      setLoginStatus('Login successful. Welcome!');
      setTimeout(() => {
        setLoginStatus('');
      }, 3000); // Clear the message after 3 seconds
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${dashboardImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <NavigationBar onLogout={handleLogout} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#FFF',
          textAlign: 'center',
        }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h6" gutterBottom className="custom-header">
            The web app to view all sales History
          </Typography>
          {loginStatus && <Typography variant="body1">{loginStatus}</Typography>}
        </Container>
      </Box>
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#263238',
          color: 'white',
          padding: 1,
        }}
      >
        Copyright © 2024 ETL for All Branch sales - MOENCO
      </Typography>
    </Box>
  );
};

export default Dashboard;
