import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import ExportToExcel from './ExportToExcel';
import Layout from './Layout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const CustomerData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 30;
  const [filter, setFilter] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3003/v1/CustomerData', {
          params: { page, pageSize }
        });
        setData(response.data.data);
        setFilteredData(response.data.data);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error('Error fetching Customer Data:', error);
      }
    };
    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    let filteredResults = [...data];
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        filteredResults = filteredResults.filter((item) =>
          item[key]?.toLowerCase().includes(filter[key]?.toLowerCase())
        );
      }
    });
    setFilteredData(filteredResults);
    setTotalPages(Math.ceil(filteredResults.length / pageSize));
  }, [filter, data, pageSize]);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
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
            Customer Data
          </Typography>
          <ExportToExcel exportUrl="http://localhost:3003/v1/export-customerdata" fileName="CustomerData.xlsx" dataType="customer" />
          <SettingsIcon sx={{ ml: 2 }} onClick={toggleDrawer(true)} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="OT Sales">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="OT Sales" />
          </ListItem>
          {/* Add more ListItems for other navigation links */}
        </List>
      </Drawer>
      <Layout userName="John Doe" role="admin" onLogout={handleLogout}>
        <div>
          <Typography variant="h4" component="div" sx={{ margin: '42px 0' }}>
            </Typography>
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Customer Sales History</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>export to excel by default exports whole data. You can filter and export.</span>
          <table className="styled-table">
            <thead>
              <tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th>Buyer Name</th>
                <th>Year</th>
                <th>FrqPerYear</th>
                <th>RankFrqPerYear</th>
                <th>TotalFrq</th>
                <th>RankTotalFrq</th>
                <th>TotalSales</th>
                <th>RankTotalSales</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice((page - 1) * pageSize, page * pageSize).map((item) => (
                <tr key={item.BuyerName}>
                  <td>{item.BuyerName}</td>
                  <td>{item.Year}</td>
                  <td>{item.FrqPerYear}</td>
                  <td>{item.RankFrqPerYear}</td>
                  <td>{item.TotalFrq}</td>
                  <td>{item.RankTotalFrq}</td>
                  <td>{item.TotalSales}</td>
                  <td>{item.RankTotalSales}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </Layout>
    </>
  );
};

export default CustomerData;
