import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1>Tretter</h1>
          <p>Your Microblogging Platform</p>
          <nav>
            <Link to="/itnaf-final/login" className="btn-nav">Login</Link>
            <Link to="/itnaf-final/register" className="btn-nav">Sign Up</Link>
          </nav>
        </div>
      </header>

      <section className="hello">
        <div className="container">
          <h2>Welcome to Tretter</h2>
          <p>Join our community and share your thoughts with the world!</p>
          <Link to="/itnaf-final/register" className="btn-primary">Get Started</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="feature">
            <h3>Connect with Friends</h3>
            <p>Find and follow friends to stay updated with their latest posts.</p>
          </div>
          <div className="feature">
            <h3>Share Your Thoughts</h3>
            <p>Express yourself and share your thoughts with the world.</p>
          </div>
          <div className="feature">
            <h3>Explore Trending Topics</h3>
            <p>Discover and join conversations on trending topics.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
