import React from 'react';

const MainContent = ({ isSidebarOpen, children }) => {
  return (
    <div
      style={{
        marginLeft: isSidebarOpen ? '200px' : '60px',
        transition: 'margin-left 0.3s ease',
        width: isSidebarOpen ? 'calc(100% - 200px)' : 'calc(100% - 60px)',
      }}
      className="p-4"
    >
      {children}
    </div>
  );
};

export default MainContent;