import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
