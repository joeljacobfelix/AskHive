import Button from '@mui/material/Button';

const Logout = () => {
  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;