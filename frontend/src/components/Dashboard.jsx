import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Questions from './Questions';
import Profile from './Profile';
import Messages from './Messages';
import Outpass from './Outpass';
import Settings from './Settings';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;