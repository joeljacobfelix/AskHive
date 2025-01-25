// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Welcome to the Home Page</h2>
    <nav>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/signup">Signup</Link></button>
    </nav>
  </div>
);

export default Home;
