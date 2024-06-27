import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Assuming your theme is correctly defined

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OTSales from './components/OTSales';
import SalesReport from './components/SalesReport';
import UserManagement from './components/UserManagement';
import CustomerData from './components/CustomerData';

const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const hasAccess = (roles) => roles.includes(role);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route
            path="/dashboard/customerdata"
            element={token && hasAccess(['admin', 'sales']) ? <CustomerData /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/otsales"
            element={token && hasAccess(['admin', 'sales', 'ot']) ? <OTSales /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/salesreport"
            element={token && hasAccess(['admin', 'sales']) ? <SalesReport /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/usermanagement"
            element={token && hasAccess(['admin']) ? <UserManagement /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
