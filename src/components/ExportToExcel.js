import React, { useState } from 'react';

const ExportToExcel = ({ exportUrl, fileName, dataType }) => {
  const [filters, setFilters] = useState({
    sourceDb: '',
    year: '',
    buyerName: ''
  });
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleExport = async () => {
    setIsExporting(true);
    setNotification('Exporting...');
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${exportUrl}?${query}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setNotification('Export successful');
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
      setNotification('Export failed');
    }
    setIsExporting(false);
  };

  return (
    <div>
      <h3>Filter and Export</h3>
      <div className="filter-container">
        {/* Conditionally render sourceDb based on data type */}
        {dataType !== 'customer' && (
          <input type="text" name="sourceDb" placeholder="Source DB" onChange={handleChange} />
        )}
        <input type="number" name="year" placeholder="Year" onChange={handleChange} />
        <input type="text" name="buyerName" placeholder="Buyer Name" onChange={handleChange} />
      </div>
      <button onClick={handleExport} disabled={isExporting} style={{ backgroundColor: isExporting ? 'grey' : '' }}>
        {isExporting ? 'Exporting...' : 'Export to Excel'}
      </button>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default ExportToExcel;
