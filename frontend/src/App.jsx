import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Answers from './components/Answers';
import Questions from './components/Questions';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import MainContent from './MainContent';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginState = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      {loggedIn ? (
        <>
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Questions />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/questions/:questionId" element={<Answers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainContent>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login handleLoginState={handleLoginState} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;