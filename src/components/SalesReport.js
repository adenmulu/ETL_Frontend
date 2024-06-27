import React, { useState, useEffect } from 'react';
import { fetchSalesReport } from '../api'; // Import your API function for fetching data
import Pagination from './Pagination';
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
import ExportToExcel from './ExportToExcel'; // Import ExportToExcel component
import '../styles.css'; // Import the CSS file

const SalesReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 30; // Adjust the page size as per your requirement (changed to 30)
  const [filter, setFilter] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSalesReport(page, pageSize); // Fetch data from your API
        setData(response.data.data);
        setFilteredData(response.data.data); // Initially set filtered data to all data
        setTotalPages(Math.ceil(response.data.total / pageSize)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching Sales Report data:', error);
      }
    };
    fetchData();
  }, [page, pageSize]); // Fetch data whenever page or pageSize changes

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // Update current page
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value }); // Update filter state
  };

  useEffect(() => {
    let filteredResults = [...data];
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        filteredResults = filteredResults.filter((item) => item[key]?.toLowerCase().includes(filter[key]?.toLowerCase()));
      }
    });
    setFilteredData(filteredResults); // Update filtered data based on filter criteria
    setTotalPages(Math.ceil(filteredResults.length / pageSize)); // Recalculate total pages for filtered data
    setPage(1); // Reset page to 1 when filters change
  }, [filter, data, pageSize]); // Re-run filter logic whenever filter, data, or pageSize changes

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize); // Get data for current page

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const exportToExcel = () => {
    // Implement your export logic here
    alert('Exporting to Excel...');
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
            Sales Report
          </Typography>
          <ExportToExcel exportUrl="http://localhost:3003/v1/export-salesreport" fileName="SalesReport.xlsx" />
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
        </List>
      </Drawer>
      <Layout userName="John Doe" role="admin" onLogout={handleLogout}>
        <div>
          <Typography variant="h4" component="div" sx={{ margin: '42px 0' }}>
      
          </Typography>
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Sales Report</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>export to excel by default exports whole data. You can filter and export.</span>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }} className="styled-table">
            <thead style={{ backgroundColor: 'black', color: 'white' }}>
              <tr>
                <th>Buyer Name</th>
                <th>Year</th>
                <th>Tin No</th>
                <th>Fsr Printer No</th>
                <th>Fs No</th>
                <th>Fs Date</th>
                <th>Fs Time</th>
              
                <th>Source Db</th>
                <th>Sales Order No</th>
                <th>Total Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.SalesOrderNo}>
                  <td>{item.buyername}</td>
                  <td>{item.SaleYear}</td>
                  <td>{item.TinNo}</td>
                  <td>{item.FsrPrinterNo}</td>
                  <td>{item.FsNo}</td>
                  <td>{item.FsDate}</td>
                  <td>{item.Fstime}</td>
              
                  <td>{item.SourceDb}</td>
                  <td>{item.SalesOrderNo}</td>
                  <td>{item.TotalPrice}</td>
                  <td>{item.Description}</td>
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

export default SalesReport;
