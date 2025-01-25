import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Answers from './components/Answers';
import Questions from './components/Questions'; 

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginState = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Home handleLoginState={handleLoginState} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup handleLoginState={handleLoginState} />} />
        <Route path="/login" element={<Login handleLoginState={handleLoginState} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:questionId" element={<Answers />} />
      </Routes>
    </Router>
  );
};

export default App;