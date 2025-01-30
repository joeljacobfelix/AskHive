// Settings.jsx
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(true);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to update the theme here
    // For now, it just logs a message
    console.log(`Theme changed to ${isDarkMode ? 'light' : 'dark'} mode`);
  };

  const handleNotificationChange = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
    // Add logic to update notification settings here
    // For now, it just logs a message
    console.log(`Notification ${isNotificationEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleEmailNotificationChange = () => {
    setIsEmailNotificationEnabled(!isEmailNotificationEnabled);
    // Add logic to update email notification settings here
    // For now, it just logs a message
    console.log(`Email notification ${isEmailNotificationEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Settings</h1>
      <h3>Theme</h3>
      <FormControlLabel
        control={
          <Switch checked={isDarkMode} onChange={handleThemeChange} />
        }
        label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
      />
      <h3>Notifications</h3>
      <FormControlLabel
        control={
          <Switch checked={isNotificationEnabled} onChange={handleNotificationChange} />
        }
        label="Enable Notifications"
      />
      <FormControlLabel
        control={
          <Switch checked={isEmailNotificationEnabled} onChange={handleEmailNotificationChange} />
        }
        label="Enable Email Notifications"
      />
      <Button variant="contained" color="primary">
        Save Changes
      </Button>
    </div>
  );
};

export default Settings;