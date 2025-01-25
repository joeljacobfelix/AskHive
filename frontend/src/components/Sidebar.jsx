import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Person,
  ReorderOutlined,
  ChatBubbleOutline,
  VpnKey,
  Settings,
  AccountCircle
} from '@mui/icons-material';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const sidebarStyle = {
    width: isOpen ? '250px' : isHovered ? 'auto' : '50px',
    height: '100vh',
    transition: 'width 0.3s',
    backgroundColor: '#f4f4f4',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const menuItems = [
    { icon: <Person />, text: 'Profile', path: '/profile' },
    { icon: <ReorderOutlined />, text: 'Questions', path: '/questions' },
    { icon: <ChatBubbleOutline />, text: 'Messages', path: '/messages' },
    { icon: <VpnKey />, text: 'Outpass', path: '/outpass' },
    { icon: <Settings />, text: 'Settings', path: '/settings' },
  ];

  return (
    <div
      style={sidebarStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isOpen ? (
        <ChevronLeft onClick={toggleSidebar} style={{ cursor: 'pointer', margin: '10px' }} />
      ) : isHovered ? (
        <ChevronRight onClick={toggleSidebar} style={{ cursor: 'pointer', margin: '10px' }} />
      ) : (
        <Menu onClick={toggleSidebar} style={{ cursor: 'pointer', margin: '10px' }} />
      )}
      {menuItems.map((item, index) => (
        <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
            {item.icon}
            {isOpen && <span style={{ marginLeft: '10px' }}>{item.text}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
