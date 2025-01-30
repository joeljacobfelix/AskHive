import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Person,
  ReorderOutlined,
  ChatBubbleOutline,
  Settings
} from '@mui/icons-material';
import Logout from './Logout';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const sidebarStyle = {
    width: isSidebarOpen ? '200px' : '60px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    overflow: 'hidden',
    borderRight: '1px solid #ddd',
    position: 'fixed',
    zIndex: 1,
    transition: 'width 0.3s ease',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
    width: '100%',
    padding: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
  };

  const menuItems = [
    { icon: <Person />, text: 'Profile', path: '/profile' },
    { icon: <ReorderOutlined />, text: 'Questions', path: '/questions' },
    { icon: <ChatBubbleOutline />, text: 'Messages', path: '/messages' },
    { icon: <Settings />, text: 'Settings', path: '/settings' },
  ];

  return (
    <div
      style={sidebarStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ marginTop: '20px', width: '100%' }}>
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} style={menuItemStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.icon}
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>{item.text}</span>}
            </div>
          </Link>
        ))}
      </div>
      {isSidebarOpen && (
        <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default Sidebar;