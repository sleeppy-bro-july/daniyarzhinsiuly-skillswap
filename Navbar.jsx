import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './Navbar.css';

function Navbar({ theme, toggleTheme, openModal, onSearch, currentUser, goToFeed, goToProfile, goToMessages, goToAnalytics, currentView, onLogin, onRegister, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`navbar modern-navbar ${theme}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-brand modern-brand" onClick={goToFeed}>
          <h1 className="brand-logo">SkillSwap</h1>
          <div className="brand-subtitle">Professional Network</div>
        </div>
        
        {/* Search Bar - Hidden on mobile */}
        <div className="search-container">
          <SearchBar onSearch={onSearch} theme={theme} />
        </div>
        
        {/* Navigation Actions */}
        <div className="navbar-actions">
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <button 
              className={`nav-btn modern-nav-btn ${currentView === 'feed' ? 'active' : ''}`}
              onClick={goToFeed}
              aria-label="Go to feed"
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </button>
            
            <button 
              className={`nav-btn modern-nav-btn ${currentView === 'messages' ? 'active' : ''}`}
              onClick={goToMessages}
              aria-label="Go to messages"
            >
              <span className="nav-icon">💬</span>
              <span className="nav-text">Messages</span>
            </button>
            
            <button 
              className={`nav-btn modern-nav-btn ${currentView === 'analytics' ? 'active' : ''}`}
              onClick={goToAnalytics}
              aria-label="Go to analytics"
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Analytics</span>
            </button>
          </div>

          {/* Theme Toggle Switch */}
          <div className="theme-toggle-container">
            <label className="theme-toggle-switch">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="theme-toggle-input"
              />
              <span className="theme-toggle-slider">
                <span className="theme-toggle-icon">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
              </span>
            </label>
          </div>
          
          {/* User Profile */}
          {currentUser && (
            <button 
              className={`profile-btn modern-profile-btn ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => goToProfile(currentUser)}
              aria-label="View your profile"
            >
              <img 
                src={currentUser.profilePicture || 'https://via.placeholder.com/150/667eea/ffffff?text=?'} 
                alt="Your profile"
                className="profile-avatar"
              />
              <span className="profile-name">{currentUser.displayName}</span>
            </button>
          )}

          {/* Authentication Buttons */}
          {!currentUser && (
            <div className="auth-buttons">
              <button 
                className="auth-btn login-btn"
                onClick={onLogin}
                aria-label="Sign in"
              >
                Sign In
              </button>
              <button 
                className="auth-btn register-btn"
                onClick={onRegister}
                aria-label="Sign up"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Logout Button */}
          {currentUser && (
            <button 
              className="auth-btn logout-btn"
              onClick={onLogout}
              aria-label="Sign out"
            >
              Sign Out
            </button>
          )}
          
          {/* Create Post Button */}
          {currentUser && (
            <button 
              className="create-post-btn modern-create-btn"
              onClick={openModal}
              aria-label="Create new post"
            >
              <span className="create-icon">✍️</span>
              <span className="create-text">Create Post</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav">
          <button 
            className={`mobile-nav-btn ${currentView === 'feed' ? 'active' : ''}`}
            onClick={() => {
              goToFeed();
              setIsMenuOpen(false);
            }}
          >
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </button>
          
          <button 
            className={`mobile-nav-btn ${currentView === 'messages' ? 'active' : ''}`}
            onClick={() => {
              goToMessages();
              setIsMenuOpen(false);
            }}
          >
            <span className="nav-icon">💬</span>
            <span>Messages</span>
          </button>
          
          <button 
            className={`mobile-nav-btn ${currentView === 'analytics' ? 'active' : ''}`}
            onClick={() => {
              goToAnalytics();
              setIsMenuOpen(false);
            }}
          >
            <span className="nav-icon">📊</span>
            <span>Analytics</span>
          </button>

          {currentUser && (
            <button 
              className={`mobile-nav-btn ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => {
                goToProfile(currentUser);
                setIsMenuOpen(false);
              }}
            >
              <span className="nav-icon">👤</span>
              <span>Profile</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
