import React from 'react';
import NavigationBar from './NavigationBar';

const Layout = ({ children, onLogout }) => {
  return (
    <div>
      <NavigationBar onLogout={onLogout} />
      <div style={{ marginLeft: '240px', marginTop: '64px', padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
