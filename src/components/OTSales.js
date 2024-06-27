import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { fetchOTSales } from '../api';
import Pagination from './Pagination';
import ExportToExcel from './ExportToExcel';
import Layout from './Layout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import '../styles.css';

const OTSales = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 35;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOTSales(page, pageSize);
        setData(response.data.data);
        setFilteredData(response.data.data);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error('Error fetching OT Sales data:', error);
      }
    };
    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleHover = (isHovered) => {
    setHovered(isHovered);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Example: removing a token from local storage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <PersonIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OT Sales
          </Typography>
          <ExportToExcel exportUrl="http://localhost:3003/v1/export-otsales" fileName="OTSales.xlsx" />
          <SettingsIcon
            sx={{ ml: 2, opacity: hovered || openDrawer ? 1 : 0.5, transition: 'opacity 0.3s' }}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={toggleDrawer(true)}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        variant={matches ? 'temporary' : 'persistent'}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={openDrawer || hovered ? 'Dashboard' : ''} />
          </ListItem>
          <ListItem button key="OT Sales">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={openDrawer || hovered ? 'OT Sales' : ''} />
          </ListItem>
        </List>
      </Drawer>
      <Layout onLogout={handleLogout}>
        <div style={{ paddingLeft: openDrawer ? 240 : 0, transition: 'padding-left 0.2s' }}>
          <Typography variant="h4" component="div" sx={{ margin: '42px 0' }}>
  
          </Typography>
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>OT Sales</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>export to excel by default exports whole data. You can filter and export.</span>
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Buyer Name</th>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Tel No</th>
                  <th>Fsr Printer No</th>
                  <th>Fs No</th>
                  <th>Fs Date</th>
                  <th>Fs Time</th>
                  <th>Pos Start Prt Time</th>
                  <th>Source Db</th>
                  <th>Sales Order No</th>
                  <th>Total Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice((page - 1) * pageSize, page * pageSize).map((item) => (
                  <tr key={item.SalesOrderNo}>
                    <td>{item.buyername}</td>
                    <td>{item.Year}</td>
                    <td>{item.Month}</td>
                    <td>{item.TelNo}</td>
                    <td>{item.FsrPrinterNo}</td>
                    <td>{item.FsNo}</td>
                    <td>{item.FsDate}</td>
                    <td>{item.Fstime}</td>
                    <td>{item.PosStartPrtTime}</td>
                    <td>{item.SourceDb}</td>
                    <td>{item.SalesOrderNo}</td>
                    <td>{item.TotalPrice}</td>
                    <td>{item.Description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </Layout>
    </>
  );
};

export default OTSales;
