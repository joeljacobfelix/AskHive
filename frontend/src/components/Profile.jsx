// Profile.jsx
import React from 'react';
import Button from '@mui/material/Button';

const Profile = () => {
  const handleLogout = () => {
    // Add your logout logic here
    // For now, it just alerts a message
    alert('Logged out successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> John Doe
      </p>
      <p>
        <strong>Questions Posted:</strong> 10
      </p>
      <p>
        <strong>Answers Given:</strong> 20
      </p>
      <p>
        <strong>Gmail:</strong> johndoe@college.com
      </p>
      <p>
        <strong>Reputation:</strong> 100
      </p>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;