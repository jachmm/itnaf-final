import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Profile from './components/UserProfile/Profile';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (isLoggedIn === 'true') {
        setLoggedIn(true);
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        try {
          const response = await fetch(`https://jachmm.pythonanywhere.com/api/users/${storedUsername}`);
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          const data = await response.json();
          const sortedPosts = data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setUser({ ...data, posts: sortedPosts });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setLoggedIn(false);
      }
    };

    fetchUserData();
  }, [loggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const refreshUserData = async () => {
    if (username) {
      try {
        const response = await fetch(`https://jachmm.pythonanywhere.com/api/users/${username}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = await response.json();
        const sortedPosts = data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setUser({ ...data, posts: sortedPosts });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  return (
    <Router>
      <div>
        <NavBar user={username} loggedIn={loggedIn} onLogout={handleLogout} />
        <div className='container'>
          <SearchBar />
          <div className="main-content">
            <Routes>
              <Route path="/itnaf-final/" element={<Home loggedIn={loggedIn} />} />
              <Route path="/itnaf-final/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/itnaf-final/register" element={<Register />} />
              <Route path="/itnaf-final/users/:username" element={<Profile loggedUserData={user} refreshUserData={refreshUserData} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
